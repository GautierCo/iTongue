-- Revert itongue:502-add-where-clause-generator-function from pg

BEGIN;

DROP FUNCTION "get_records", "get_expressions", "show_users", "get_users_with_relations", "get_users", "show_records", "build_where_clause";

DROP TYPE "record_display_type", "user_display_type", "expression_with_relations_type";

CREATE VIEW "expression_with_relations" AS
     SELECT "e"."id", "e"."label",
            (SELECT "text"
               FROM "translation" "t"
               JOIN "language" "l"
                 ON "t"."language_id" = "l"."id"
              WHERE "t"."expression_id" = "e"."id" AND "l"."name" ILIKE 'english') AS "englishText",
            "e"."created_at" AS "createdAt",
            COALESCE(json_agg(("tr"."id", "tr"."text", "tr"."created_at", "tr"."language")::"expression_translation") FILTER(WHERE "tr"."id" IS NOT NULL), '[]') AS "translations"
       FROM "expression" "e"
  LEFT JOIN "translation_with_relations" "tr"
         ON "e"."id" = "tr"."expression_id"
   GROUP BY "e"."id"
   ORDER BY "e"."id" DESC;

CREATE VIEW "user_display" AS
     SELECT "id", "email", "firstname", "lastname", "bio", "slug", "avatar_url" AS "avatarUrl", "is_admin" AS "isAdmin", "created_at" AS "createdAt", "records", "learnedLanguages", "taughtLanguages", "followerCount", "followedCount"
       FROM "user_with_relations";

COMMIT;
