-- Deploy itongue:503-constraints-and-indexes to pg

BEGIN;

ALTER TABLE "language"
ADD CONSTRAINT "unique_name" UNIQUE ("name");

ALTER TABLE "translation"
ADD CONSTRAINT "unique_translation" UNIQUE ("expression_id", "language_id");

ALTER TABLE "record"
ADD CONSTRAINT "unique_record" UNIQUE ("user_id", "translation_id");

ALTER TABLE "language_user"
ADD CONSTRAINT "unique_language" UNIQUE ("language_id", "user_id", "role");

ALTER TABLE "user_user_follow"
ADD CONSTRAINT "self_subscription" CHECK ("follower_id" <> "followed_id");

CREATE UNIQUE INDEX "user_email_idx" ON "user" ("email");
CREATE UNIQUE INDEX "user_slug_idx" ON "user" ("slug");
CREATE INDEX "user_firstname_idx" ON "user" ("firstname");
CREATE INDEX "user_lastname_idx" ON "user" ("lastname");

CREATE INDEX "translation_text_idx" ON "translation" ("text");

COMMIT;
