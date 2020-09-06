-- Revert itongue:600-create-tables-comments-like-fav from pg

BEGIN;

DROP TABLE "record_user_like", "record_user_bookmark", "record_comment";

COMMIT;
