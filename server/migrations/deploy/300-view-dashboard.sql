-- Deploy itongue:300-view-dachboard to pg

BEGIN;

CREATE TYPE "dashboard_user" AS ("id" INT, "email" TEXT, "firstname" TEXT, "lastname" TEXT, "slug" TEXT, "createdAt" TIMESTAMPTZ);
CREATE TYPE "dashboard_record" AS ("id" INT, "url" TEXT, "createdAt" TIMESTAMPTZ, "user" JSON, "translation" JSON);
CREATE TYPE "dashboard_record_translation" AS ("id" INT, "text" TEXT, "languageName" TEXT, "languageCode" TEXT, "expressionId" INT);

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
