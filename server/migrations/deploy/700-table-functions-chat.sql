-- Deploy itongue:700-table-functions-chat to pg

BEGIN;

CREATE TABLE "message" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "text" TEXT NOT NULL,
  "sender_id" INT REFERENCES "user"("id") ON DELETE SET NULL,
  "recipient_id" INT REFERENCES "user"("id") ON DELETE SET NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "read" BOOLEAN DEFAULT FALSE,
  CONSTRAINT "self_message" CHECK ("recipient_id" <> "sender_id")
);

CREATE TYPE "thread_message" AS ("id" INT, "text" TEXT, "createdAt" TIMESTAMPTZ, "read" BOOLEAN, "sender" JSON, "recipient" JSON);

CREATE FUNCTION "get_threads"("user_id" INT)
RETURNS TABLE("contact" JSON, "messages" JSON, "latest" TIMESTAMPTZ) AS
$$

  SELECT to_json(("u"."id", "u"."email", "u"."firstname", "u"."lastname", "u"."slug", "u"."avatar_url", "u"."created_at")::"plain_user") as "contact",
         "t"."messages", "t"."latest"
    FROM (SELECT CASE WHEN "m"."sender_id" = "user_id"
                      THEN "m"."recipient_id"
                      WHEN "m"."recipient_id" = "user_id"
                      THEN "m"."sender_id"
                      END AS "contact_id",
                 json_agg(("m"."id", "m"."text", "m"."created_at", "m"."read",
                          to_json(("su"."id", "su"."email", "su"."firstname", "su"."lastname", "su"."slug", "su"."avatar_url", "su"."created_at")::"plain_user"),
                          to_json(("ru"."id", "ru"."email", "ru"."firstname", "ru"."lastname", "ru"."slug", "ru"."avatar_url", "ru"."created_at")::"plain_user"))::"thread_message" ORDER BY "m"."id") AS "messages",
                 MAX("m"."created_at") AS "latest"
           FROM "message" "m"
           JOIN "user" "su"
             ON "m"."sender_id" = "su"."id"
           JOIN "user" "ru"
             ON "m"."recipient_id" = "ru"."id"
          WHERE "m"."sender_id" = "user_id"
             OR "m"."recipient_id" = "user_id"
       GROUP BY "contact_id"
       ORDER BY "latest" DESC) "t"
    JOIN "user" "u"
      ON "t"."contact_id" = "u"."id";

$$ LANGUAGE SQL STABLE;

CREATE TYPE "thread" AS ("contact" JSON, "messages" JSON, "newMessages" INT);

CREATE FUNCTION "get_thread"("user_id" INT, "contact_id" INT)
RETURNS "thread" AS
$$
     WITH "updated_rows"
       AS(UPDATE "message"
             SET "read" = TRUE
           WHERE "read" = FALSE
             AND "recipient_id" = "user_id"
             AND "sender_id" = "contact_id"
       RETURNING 1)
   SELECT to_json(("u"."id", "u"."email", "u"."firstname", "u"."lastname", "u"."slug", "u"."avatar_url", "u"."created_at")::"plain_user"),
          COALESCE("t"."messages", '[]'),
          (SELECT COUNT(*) FROM "updated_rows")::INT
     FROM "user" "u"
LEFT JOIN "get_threads"("user_id") "t"
       ON "u"."id" = ("t"."contact"->>'id')::INT
    WHERE "u"."id" = "contact_id";
$$ LANGUAGE SQL VOLATILE;

COMMIT;
