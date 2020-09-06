-- Deploy itongue:201-views-expressions to pg

BEGIN;

CREATE TYPE "expression_translation" AS ("id" INT, "text" TEXT, "createdAt" TIMESTAMPTZ, "language" JSON);

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

COMMIT;
