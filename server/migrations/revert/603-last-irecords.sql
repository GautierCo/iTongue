-- Revert itongue:603-last-irecords from pg

BEGIN;

DROP VIEW "last_irecords";

CREATE FUNCTION "last_irecords"("limit" INT)
RETURNS TABLE("id" INT, "url" TEXT, "createdAt" TIMESTAMPTZ, "user" JSON, "englishTranslation" JSON, "translation" JSON)
AS $$

BEGIN

    RETURN QUERY
   SELECT * FROM "record_display"
        ORDER BY "createdAt" DESC
           LIMIT $1;

END

$$ LANGUAGE plpgsql STABLE;


COMMIT;
