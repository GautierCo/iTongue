-- Deploy itongue:502-add-where-clause-generator-function to pg

BEGIN;

DROP VIEW "user_display", "expression_with_relations";

CREATE TYPE "expression_with_relations_type" AS
("id" INT, "label" TEXT, "englishText" TEXT, "createdAt" TIMESTAMPTZ, "translations" JSON);

CREATE TYPE "user_display_type" AS
("id" INT, "email" TEXT, "firstname" TEXT, "lastname" TEXT, "slug" TEXT, "bio" TEXT, "avatarUrl" TEXT, "isAdmin" BOOLEAN,
"createdAt" TIMESTAMPTZ, "records" JSON, "learnedLanguages" JSON, "taughtLanguages" JSON, "followerCount" INT, "followedCount" INT);

CREATE TYPE "record_display_type" AS
("id" INT, "url" TEXT, "createdAt" TIMESTAMPTZ, "user" JSON, "englishTranslation" JSON, "translation" JSON);

CREATE FUNCTION "build_where_clause"("filter" JSON)
RETURNS TEXT AS
$$
DECLARE
  "clause" TEXT := '';
  "field" TEXT;
  "detail" JSON;
  "iterator" INT := 0;
BEGIN
  FOR "field", "detail" IN SELECT * FROM json_each("filter")
  LOOP
    IF "iterator" = 0 THEN
      "clause" := "clause" || ' WHERE ';
    ELSE
      "clause" := "clause" || ' AND ';
    END IF;

    IF(("detail"->>'table') IS NOT NULL) THEN
      "clause" := "clause" || format('%I.', "detail"->>'table');
    END IF;

    "clause" := "clause" || format('%I', "field");

    IF(("detail"->>'key') IS NOT NULL) THEN
      "clause" := "clause" || format('->>%L', "detail"->>'key');
    END IF;

    "clause" := "clause" || format(' %s', "detail"->>'operator');

    -- filter without a value, e.g. when operator is IS NULL
    IF(("detail"->>'value') IS NOT NULL) THEN
      "clause" := "clause" || format(' %L', "detail"->>'value');
    END IF;

    "iterator" := "iterator" + 1;
  END LOOP;
  -- RAISE NOTICE 'clause : %', "clause";
  RETURN "clause";
END
$$ LANGUAGE plpgsql IMMUTABLE;


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

CREATE FUNCTION "get_users"("filter" JSON DEFAULT '{}')
RETURNS SETOF "user" AS
$$
DECLARE
  "query" TEXT := 'SELECT * FROM "user"';
BEGIN
  "query" := "query" || "build_where_clause"("filter") || ' ORDER BY "id" DESC';
  RETURN QUERY EXECUTE "query";
END
$$ LANGUAGE plpgsql STABLE;

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

CREATE FUNCTION "show_users"("filter" JSON DEFAULT '{}')
RETURNS SETOF "user_display_type" AS
$$
  SELECT "id", "email", "firstname", "lastname", "slug", "bio", "avatar_url" AS "avatarUrl", "is_admin" AS "isAdmin", "created_at" AS "createdAt", "records", "learnedLanguages", "taughtLanguages", "followerCount", "followedCount"
    FROM "get_users_with_relations"("filter");
$$ LANGUAGE SQL STABLE;

-- select * from get_expressions('{"id": {"table": "e", "operator": ">", "value": 4}, "language": {"table": "tr", "key": "name", "operator": "ILIKE", "value": "english"}}');
CREATE FUNCTION "get_expressions"("filter" JSON DEFAULT '{}')
RETURNS SETOF "expression_with_relations_type" AS
$$
DECLARE
  "query" TEXT := 'SELECT "e"."id", "e"."label",
                          (SELECT "text"
                            FROM "translation" "t"
                            JOIN "language" "l"
                              ON "t"."language_id" = "l"."id"
                            WHERE "t"."expression_id" = "e"."id" AND "l"."name" ILIKE ''english'') AS "englishText",
                          "e"."created_at" AS "createdAt",
                          COALESCE(json_agg(("tr"."id", "tr"."text", "tr"."created_at", "tr"."language")::"expression_translation") FILTER(WHERE "tr"."id" IS NOT NULL), ''[]'') AS "translations"
                    FROM "expression" "e"
               LEFT JOIN "translation_with_relations" "tr"
                      ON "e"."id" = "tr"."expression_id"';
BEGIN
  "query" := "query" || "build_where_clause"("filter") || ' GROUP BY "e"."id" ORDER BY "e"."id" DESC';
  -- RAISE NOTICE 'query: %', "query";
  RETURN QUERY EXECUTE "query";
END
$$ LANGUAGE plpgsql STABLE;

CREATE FUNCTION "get_records"("filter" JSON DEFAULT '{}')
RETURNS SETOF "public"."record" AS
$$
DECLARE
  "query" TEXT := 'SELECT * FROM "record"';
BEGIN
  "query" := "query" || "build_where_clause"("filter") || ' ORDER BY "id" DESC';
  RETURN QUERY EXECUTE "query";
END
$$ LANGUAGE plpgsql STABLE;

COMMIT;
