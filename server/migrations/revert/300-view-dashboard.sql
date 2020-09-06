-- Revert itongue:300-view-dachboard from pg

BEGIN;

DROP VIEW "dashboard";

DROP TYPE "dashboard_record_translation", "dashboard_record", "dashboard_user" ;

COMMIT;
