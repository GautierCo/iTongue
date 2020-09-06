-- Revert itongue:202-function-search from pg

BEGIN;

DROP FUNCTION "find_users"("expression" TEXT);
DROP FUNCTION "find_records"("expression" TEXT);
DROP FUNCTION "find_users_records" ("expression" TEXT);

COMMIT;
