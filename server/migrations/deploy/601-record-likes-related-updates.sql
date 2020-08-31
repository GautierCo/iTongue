-- Deploy itongue:601-record-likes-related-updates to pg

BEGIN;

DROP VIEW "dashboard";
DROP TYPE "dashboard_user";

CREATE TYPE "plain_user" AS ("id" INT, "email" TEXT, "firstname" TEXT, "lastname" TEXT, "slug" TEXT, "avatarUrl" TEXT, "createdAt" TIMESTAMPTZ);

CREATE VIEW "dashboard" AS
  SELECT (SELECT COUNT(*) FROM "user") AS "userCount",
         (SELECT COUNT(*) FROM "record") AS "recordCount",
         (SELECT COUNT(*) FROM "language") AS "languageCount",
         (SELECT COUNT(*) FROM "translation") AS "translationCount",
         (SELECT json_agg(("id", "email", "firstname", "lastname", "slug", "avatar_url", "created_at")::"plain_user")
            FROM (SELECT *
                    FROM "user"
                ORDER BY "id" DESC
                   LIMIT 16) AS "users") AS "recentUsers",
         (SELECT json_agg((
              "id", "url", "created_at",
              to_json(("u_id", "email", "firstname", "lastname", "slug", "avatar_url", "u_created_at")::"plain_user"),
              to_json(("t_id", "text", "name", "code", "expression_id")::"dashboard_record_translation")
            )::"dashboard_record")
            FROM (SELECT "r"."id", "r"."url", "r"."created_at",
                         "u"."id" AS "u_id", "u"."email", "u"."firstname", "u"."lastname", "u"."slug", "u"."avatar_url", "u"."created_at" AS "u_created_at",
                         "t"."id" AS "t_id", "t"."text", "l"."name", "l"."code", "t"."expression_id"
                    FROM "record" "r"
               LEFT JOIN "user" "u" 
                      ON "r"."user_id" = "u"."id"
               LEFT JOIN "translation" "t"
                      ON "r"."translation_id" = "t"."id"
               LEFT JOIN "language" "l"
                      ON "t"."language_id" = "l"."id"
                ORDER BY "r"."created_at" DESC
                   LIMIT 16) AS "records") AS "recentRecords";

DROP FUNCTION "show_records";

ALTER TYPE "record_display_type" ADD ATTRIBUTE "likeCount" INT;
ALTER TYPE "record_display_type" ADD ATTRIBUTE "bookmarkCount" INT;
ALTER TYPE "record_display_type" ADD ATTRIBUTE "commentCount" INT;

CREATE FUNCTION "show_records"("filter" JSON DEFAULT '{}')
RETURNS SETOF "record_display_type" AS
$$
DECLARE
  "query" TEXT := 'SELECT "r"."id", "r"."url", "r"."created_at" AS "createdAt",
                            to_json(("u"."id", "u"."firstname", "u"."lastname", "u"."slug", "u"."avatar_url")::"record_user") AS "user",
                            (SELECT to_json(("id", "text", "created_at", "expression", "language")::"record_translation")
                               FROM "translation_with_relations"
                              WHERE "language"->>''name'' ILIKE ''english''
                                AND "t"."expression"->>''id'' = "expression"->>''id'') AS "englishTranslation",
                            to_json(("t"."id", "t"."text", "t"."created_at", "t"."expression", "t"."language")::"record_translation") AS "translation",
                            (SELECT COUNT(*)
                               FROM "record_user_like"
                              WHERE "record_id" = "r"."id")::INT AS likeCount,
                            (SELECT COUNT(*)
                               FROM "record_user_bookmark"
                              WHERE "record_id" = "r"."id")::INT AS bookmarkCount,
                            (SELECT COUNT(*)
                               FROM "record_comment"
                              WHERE "record_id" = "r"."id")::INT AS commentCount
                     FROM "record" "r"
                LEFT JOIN "user" "u"
                       ON "r"."user_id" = "u"."id"
                LEFT JOIN "translation_with_relations" "t"
                       ON "r"."translation_id" = "t"."id"';
BEGIN
  "query" := "query" || "build_where_clause"("filter") || ' ORDER BY "r"."id" DESC';
  -- RAISE NOTICE 'query: %', "query";
  RETURN QUERY EXECUTE "query";
END
$$ LANGUAGE plpgsql STABLE;

DROP FUNCTION "get_users_with_relations";

ALTER TYPE "user_record" ADD ATTRIBUTE "likeCount" INT;
ALTER TYPE "user_record" ADD ATTRIBUTE "bookmarkCount" INT;
ALTER TYPE "user_record" ADD ATTRIBUTE "commentCount" INT;

CREATE FUNCTION "get_users_with_relations"("filter" JSON DEFAULT '{}')
RETURNS SETOF "user_with_relations" AS
$$
DECLARE
  "query" TEXT := 'SELECT "u".*,
 	     (SELECT COALESCE(json_agg(("r"."id", "r"."url", "r"."createdAt", "r"."englishTranslation", "r"."translation", "r"."likeCount", "r"."bookmarkCount", "r"."commentCount")::"user_record") FILTER(WHERE "r"."id" IS NOT NULL), ''[]'')
		      FROM "show_records"() "r"
	 	     WHERE "u"."id" = ("r"."user"->>''id'')::INT) AS "records",
	     (SELECT COALESCE(json_agg("l".*) FILTER(WHERE "lu"."role" = ''learner''), ''[]'')
		      FROM "language_user" "lu"
		      JOIN "language" "l"
            ON "lu"."language_id" = "l"."id"
		     WHERE "lu"."user_id" = "u"."id") AS "learnedLanguages",
       (SELECT COALESCE(json_agg("l".*) FILTER(WHERE "lu"."role" = ''teacher''), ''[]'')
		      FROM "language_user" "lu"
		      JOIN "language" "l" ON "lu"."language_id" = "l"."id"
		     WHERE "lu"."user_id" = "u"."id") AS "taughtLanguages",
       (SELECT COUNT(*)
          FROM "user_user_follow"
         WHERE "followed_id" = "u"."id")::INT AS "followerCount",
       (SELECT COUNT(*)
          FROM "user_user_follow"
         WHERE "follower_id" = "u"."id")::INT AS "followedCount"
          FROM "user" "u"';
BEGIN
  "query" := "query" || "build_where_clause"("filter") || ' ORDER BY "u"."id" DESC';
  -- RAISE NOTICE 'query : %', "query";
  RETURN QUERY EXECUTE "query";
END
$$ LANGUAGE plpgsql STABLE;

CREATE FUNCTION "get_record_likes"("record_id" INT)
RETURNS SETOF "plain_user" AS
$$
  SELECT "u"."id", "u"."email", "u"."firstname", "u"."lastname", "u"."slug", "u"."avatar_url" AS "avatarUrl", "u"."created_at" AS "createdAt"
    FROM "record_user_like" "l"
    JOIN "user" "u"
      ON "l"."user_id" = "u"."id"
   WHERE "l"."record_id" = $1
ORDER BY "l"."id" DESC;
$$ LANGUAGE SQL STABLE;

CREATE FUNCTION "get_record_bookmarks"("record_id" INT)
RETURNS SETOF "plain_user" AS
$$
  SELECT "u"."id", "u"."email", "u"."firstname", "u"."lastname", "u"."slug", "u"."avatar_url" AS "avatarUrl", "u"."created_at" AS "createdAt"
    FROM "record_user_bookmark" "b"
    JOIN "user" "u"
      ON "b"."user_id" = "u"."id"
   WHERE "b"."record_id" = $1
ORDER BY "b"."id" DESC;
$$ LANGUAGE SQL STABLE;

CREATE FUNCTION "get_user_likes"("user_id" INT)
RETURNS SETOF "record_display_type" AS
$$
  SELECT "r".*
    FROM "record_user_like" "l"
    JOIN "show_records"() "r"
      ON "l"."record_id" = "r"."id"
   WHERE "l"."user_id" = $1
ORDER BY "l"."id" DESC;
$$ LANGUAGE SQL STABLE;

CREATE FUNCTION "get_user_bookmarks"("user_id" INT)
RETURNS SETOF "record_display_type" AS
$$
  SELECT "r".*
    FROM "record_user_bookmark" "b"
    JOIN "show_records"() "r"
      ON "b"."record_id" = "r"."id"
   WHERE "b"."user_id" = $1
ORDER BY "b"."id" DESC;
$$ LANGUAGE SQL STABLE;

COMMIT;