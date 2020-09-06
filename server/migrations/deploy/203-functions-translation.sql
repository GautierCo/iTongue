-- Deploy itongue:203-functions-translation to pg

BEGIN;

CREATE OR REPLACE FUNCTION "insert_translation"("new_translation" JSON)
RETURNS INT
AS $$

  INSERT INTO "translation"("text", "expression_id", "language_id")
       SELECT "text", "expression_id", "language_id"
         FROM json_populate_record(NULL::"translation", "new_translation")
    RETURNING "id";

$$ LANGUAGE SQL VOLATILE;



CREATE OR REPLACE FUNCTION "update_translation"(
  "translation_id" INT, 
  "new_text" TEXT, 
  "new_expression_id" INT,
  "new_language_id" INT
)
RETURNS BOOLEAN
AS $$

      UPDATE "translation"
         SET "text" = "new_text",
             "expression_id" = "new_expression_id",
             "language_id" = "new_language_id"
       WHERE "id" = "translation_id"
   RETURNING TRUE;

$$ LANGUAGE SQL VOLATILE;

COMMIT;
