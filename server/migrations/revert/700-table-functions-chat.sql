-- Revert itongue:700-table-functions-chat from pg

BEGIN;

DROP FUNCTION "get_thread", "get_threads";

DROP TYPE "thread", "thread_message";

DROP TABLE "message";

COMMIT;
