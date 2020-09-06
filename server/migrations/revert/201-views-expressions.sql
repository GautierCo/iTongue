-- Revert itongue:201-views-expressions from pg

BEGIN;

DROP VIEW "expression_with_relations";

DROP TYPE "expression_translation";

COMMIT;
