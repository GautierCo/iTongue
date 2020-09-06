-- Deploy itongue:204-function-language to pg

BEGIN;

CREATE OR REPLACE FUNCTION "update_language"("language_id" INT, "new_name" TEXT, "new_code" TEXT)
RETURNS BOOLEAN
AS $$

	UPDATE "language"
			SET "name" = "new_name",
					"code" = "new_code"
		WHERE "id" = "language_id"
RETURNING TRUE;

$$ LANGUAGE SQL VOLATILE;

CREATE OR REPLACE FUNCTION "delete_row_from_relation"("_relation_name" REGCLASS, "row_id" INT)
RETURNS BOOLEAN
AS $$
#print_strict_params on
DECLARE "isDelete" BOOLEAN;
BEGIN
	
	EXECUTE format('DELETE FROM %I WHERE "id" = %L RETURNING TRUE', "_relation_name", "row_id")
	INTO "isDelete";

	IF "isDelete" IS NOT NULL THEN
		RETURN "isDelete";
	ELSE
		RETURN FALSE;
	END IF;

END

$$ LANGUAGE plpgsql VOLATILE;

COMMIT;
