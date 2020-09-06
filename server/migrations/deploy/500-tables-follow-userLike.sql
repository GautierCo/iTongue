-- Deploy itongue:500-tables-follow-userLike to pg

BEGIN;

CREATE TABLE "user_user_follow" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "follower_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "followed_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
);

ALTER TABLE "user_user_follow"
ADD CONSTRAINT "unique_follow" UNIQUE ("follower_id", "followed_id");

CREATE FUNCTION "get_user_subscriptions" ("user_id" INT, "source" TEXT, "target" TEXT) 
RETURNS TABLE("id" INT, "firstname" TEXT, "lastname" TEXT, "slug" TEXT, "avatarUrl" TEXT) AS
$$
BEGIN
  RETURN QUERY EXECUTE
    format('SELECT "u"."id", "u"."firstname", "u"."lastname", "u"."slug", "u"."avatar_url" AS "avatarUrl"
    FROM "user" "u"
    JOIN "user_user_follow" "f"
      ON "u"."id" = "f".%I
   WHERE "f".%I = %L
ORDER BY "f"."created_at" DESC', "source", "target", "user_id");
END
$$
LANGUAGE plpgsql STABLE;

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

COMMIT;
