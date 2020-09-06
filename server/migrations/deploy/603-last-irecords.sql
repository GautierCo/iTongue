-- Deploy itongue:603-last-irecords to pg

BEGIN;

DROP FUNCTION "last_irecords"("limit" INT);

CREATE VIEW "last_irecords" AS
   SELECT "r"."id", "r"."url", "r"."created_at" AS "createdAt",
          to_json(("u"."id", "u"."firstname", "u"."lastname", "u"."slug", "u"."avatar_url")::"record_user") AS "user",
          (SELECT to_json(("id", "text", "created_at", "expression", "language")::"record_translation")
             FROM "translation_with_relations"
            WHERE "language"->>'name' ILIKE 'english'
              AND "t"."expression"->>'id' = "expression"->>'id') AS "englishTranslation",
          to_json(("t"."id", "t"."text", "t"."created_at", "t"."expression", "t"."language")::"record_translation") AS "translation",
          (SELECT count(*) FROM "record_comment" "rc" WHERE "rc"."record_id" = "r"."id") AS "commentCount",
          (SELECT count(*) FROM "record_user_like" "rl" WHERE "rl"."record_id" = "r"."id") AS "likeCount"
     FROM "record" "r"
LEFT JOIN "user" "u"
       ON "r"."user_id" = "u"."id"
LEFT JOIN "translation_with_relations" "t"
       ON "r"."translation_id" = "t"."id"
 ORDER BY "createdAt" DESC;

COMMIT;
