-- Deploy itongue:602-functions-comment to pg

BEGIN;

CREATE VIEW "comments_with_user" AS
  SELECT "r"."id", "r"."text", "r"."record_id" AS "recordId",
         json_build_object(
           'id', "u"."id", 
           'firstname', "u"."firstname", 
           'lastname', "u"."lastname", 
           'slug', "u"."slug", 
           'avatarUrl', "u"."avatar_url") AS "user",
         "r"."created_at" AS "createdAt"
            FROM "record_comment" "r" 
       LEFT JOIN "user" "u" ON "u"."id" = "r"."user_id"
        ORDER BY "r"."created_at" ASC;

COMMIT;
