-- Revert itongue:204-function-language from pg

BEGIN;

DROP FUNCTION "update_language"("language_id" INT, "new_name" TEXT, "new_code" TEXT);
DROP FUNCTION "delete_row_from_relation"("_relation_name" REGCLASS, "row_id" INT, OUT deleted BOOLEAN);

COMMIT;
