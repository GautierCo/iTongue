-- Revert itongue:203-functions-translation from pg

BEGIN;

DROP FUNCTION "insert_translation"("new_translation" JSON);
DROP FUNCTION "update_translation"("id" INT, "text" TEXT, "language_id" INT, "expression_id" INT);

COMMIT;
