-- Revert itongue:602-functions-comment from pg

BEGIN;

DROP VIEW "comments_with_user";

COMMIT;
