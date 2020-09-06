-- Revert itongue:100-initial-migration from pg

BEGIN;

DROP TABLE "language_user", "record", "translation", "expression", "language", "user";

DROP TYPE user_role;

COMMIT;
