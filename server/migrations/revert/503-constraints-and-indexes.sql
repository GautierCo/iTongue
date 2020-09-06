-- Revert itongue:503-constraints-and-indexes from pg

BEGIN;

DROP INDEX "translation_text_idx", "user_lastname_idx", "user_firstname_idx", "user_slug_idx", "user_email_idx";

ALTER TABLE "user_user_follow" DROP CONSTRAINT "self_subscription";

ALTER TABLE "language_user" DROP CONSTRAINT "unique_language";

ALTER TABLE "record" DROP CONSTRAINT "unique_record";

ALTER TABLE "translation" DROP CONSTRAINT "unique_translation";

ALTER TABLE "language" DROP CONSTRAINT "unique_name";

COMMIT;
