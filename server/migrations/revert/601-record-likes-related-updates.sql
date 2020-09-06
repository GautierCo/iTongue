-- Revert itongue:601-record-likes-related-updates from pg

BEGIN;

DROP FUNCTION "get_user_bookmarks", "get_user_likes", "get_record_bookmarks", "get_record_likes";

DROP FUNCTION "get_feed";

CREATE FUNCTION "get_feed" ("user_id" INT) 
RETURNS SETOF "record_display" AS
$$
   SELECT "r".*
    FROM "record_display" "r"
    JOIN "user_user_follow" "f"
      ON ("r"."user"->>'id')::INT = "f"."followed_id"
   WHERE "f"."follower_id" = "user_id"
ORDER BY "r"."createdAt" DESC;
$$
LANGUAGE SQL STABLE;

DROP FUNCTION "show_users", "get_users_with_relations";

DROP TYPE "user_with_relations_type";

ALTER TYPE "user_record" DROP ATTRIBUTE "likeCount";
ALTER TYPE "user_record" DROP ATTRIBUTE "bookmarkCount";
ALTER TYPE "user_record" DROP ATTRIBUTE "commentCount";

CREATE FUNCTION "get_users_with_relations"("filter" JSON DEFAULT '{}')
RETURNS SETOF "user_with_relations" AS
$$
DECLARE
  "query" TEXT := 'SELECT "u".*,
 	     (SELECT COALESCE(json_agg(("r"."id", "r"."url", "r"."createdAt", "r"."englishTranslation", "r"."translation")::"user_record") FILTER(WHERE "r"."id" IS NOT NULL), ''[]'')
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

ALTER TYPE "user_display_type" DROP ATTRIBUTE "followed";
ALTER TYPE "user_display_type" DROP ATTRIBUTE "followers";
ALTER TYPE "user_display_type" ADD ATTRIBUTE "followedCount" INT;
ALTER TYPE "user_display_type" ADD ATTRIBUTE "followerCount" INT;

CREATE FUNCTION "show_users"("filter" JSON DEFAULT '{}')
RETURNS SETOF "user_display_type" AS
$$
  SELECT "id", "email", "firstname", "lastname", "slug", "bio", "avatar_url" AS "avatarUrl", "is_admin" AS "isAdmin", "created_at" AS "createdAt", "records", "learnedLanguages", "taughtLanguages", "followerCount", "followedCount"
    FROM "get_users_with_relations"("filter");
$$ LANGUAGE SQL STABLE;

DROP FUNCTION "show_records";

ALTER TYPE "record_display_type" DROP ATTRIBUTE "commentCount";
ALTER TYPE "record_display_type" DROP ATTRIBUTE "bookmarkCount";
ALTER TYPE "record_display_type" DROP ATTRIBUTE "likeCount";

CREATE FUNCTION "show_records"("filter" JSON DEFAULT '{}')
RETURNS SETOF "record_display" AS
$$
DECLARE
  "query" TEXT := 'SELECT "r"."id", "r"."url", "r"."created_at" AS "createdAt",
                            to_json(("u"."id", "u"."firstname", "u"."lastname", "u"."slug", "u"."avatar_url")::"record_user") AS "user",
                            (SELECT to_json(("id", "text", "created_at", "expression", "language")::"record_translation")
                               FROM "translation_with_relations"
                              WHERE "language"->>''name'' ILIKE ''english''
                                AND "t"."expression"->>''id'' = "expression"->>''id'') AS "englishTranslation",
                            to_json(("t"."id", "t"."text", "t"."created_at", "t"."expression", "t"."language")::"record_translation") AS "translation"
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

DROP VIEW "dashboard";
DROP TYPE "plain_user";
CREATE TYPE "dashboard_user" AS ("id" INT, "email" TEXT, "firstname" TEXT, "lastname" TEXT, "slug" TEXT, "createdAt" TIMESTAMPTZ);

CREATE VIEW "dashboard" AS
  SELECT (SELECT COUNT(*) FROM "user") AS "userCount",
         (SELECT COUNT(*) FROM "record") AS "recordCount",
         (SELECT COUNT(*) FROM "language") AS "languageCount",
         (SELECT COUNT(*) FROM "translation") AS "translationCount",
         (SELECT json_agg(("id", "email", "firstname", "lastname", "slug", "created_at")::"dashboard_user")
            FROM (SELECT *
                    FROM "user"
                ORDER BY "created_at" DESC
                   LIMIT 16) AS "users") AS "recentUsers",
         (SELECT json_agg((
              "id", "url", "created_at",
              to_json(("u_id", "email", "firstname", "lastname", "slug", "u_created_at")::"dashboard_user"),
              to_json(("t_id", "text", "name", "code", "expression_id")::"dashboard_record_translation")
            )::"dashboard_record")
            FROM (SELECT "r"."id", "r"."url", "r"."created_at",
                         "u"."id" AS "u_id", "u"."email", "u"."firstname", "u"."lastname", "u"."slug", "u"."created_at" AS "u_created_at",
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

COMMIT;
