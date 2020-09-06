-- Deploy itongue:400-view-landingpage to pg

BEGIN;

CREATE TYPE "best_users" AS ("userId" INT,"slug" TEXT, "firstname" TEXT, "lastname" TEXT, "avatarUrl" TEXT, "languageMostTaught" JSONB, "iRecords" BIGINT);

CREATE TYPE "best_translations" AS ("translationId" INT, "text" TEXT, "language" TEXT, "expression" TEXT, "expressionId" INT, "iRecords" BIGINT);

CREATE TYPE "most_used_language_by_user" AS ("language" TEXT, "code" TEXT, "occurrences" BIGINT);


CREATE OR REPLACE FUNCTION "most_used_language_by_user"("user_id" INT)
RETURNS setof "most_used_language_by_user"
AS $$

BEGIN

		RETURN QUERY
		SELECT DISTINCT "l"."name" AS "language", 
										"l"."code" AS "code",
										count(*) AS "occurrences"
							 FROM "language" "l"
							 JOIN "translation" "t" ON "l"."id" = "t"."language_id"
							 JOIN "record" "r" ON "r"."translation_id" = "t"."id"
							WHERE "r"."user_id" = $1
					 GROUP BY "l"."name", "l"."code"
					 ORDER BY "occurrences" DESC
					 	  LIMIT 1;

END

$$ LANGUAGE plpgsql STABLE;



CREATE OR REPLACE FUNCTION "users_with_more_irecords"("limit" INT)
RETURNS setof "best_users"
AS $$

BEGIN

    RETURN QUERY
    SELECT DISTINCT "r"."user_id" AS "userId", 
                    "u"."slug",
                    "u"."firstname",
                    "u"."lastname",
                    "u"."avatar_url",
										to_jsonb("i"::"most_used_language_by_user") AS "languageMostTaught",
                    count(*) AS "iRecords"
              FROM "record" "r" 
			  CROSS JOIN LATERAL "most_used_language_by_user"("r"."user_id") "i"
              JOIN "user" "u" ON "u"."id" = "r"."user_id"
          GROUP BY "r"."user_id", 
                    "u"."slug",
                    "u"."firstname",
                    "u"."lastname",
                    "u"."avatar_url",
										"i".*
          ORDER BY "iRecords" DESC
             LIMIT $1;

END

$$ LANGUAGE plpgsql STABLE;

CREATE OR REPLACE FUNCTION "translations_with_more_irecords"("limit" INT)
RETURNS setof "best_translations"
AS $$

BEGIN

  RETURN QUERY
  SELECT DISTINCT "r"."translation_id" AS "translationId",
                  "t"."text" AS "text",
                  "l"."code" AS "language",
                  "e"."label" AS "expression",
                  "e"."id" AS "expressionId",
                  count(*) AS "iRecords"
            FROM "record" "r"
            JOIN "translation" "t" ON "t"."id" = "r"."translation_id"
            JOIN "expression" "e" ON "t"."expression_id" = "e"."id"
            JOIN "language" "l" ON "t"."language_id" = "l"."id"
        GROUP BY "translationId",
                  "t"."text",
                  "e"."label",
                  "e"."id",
                  "l"."code"
        ORDER BY "iRecords" DESC
           LIMIT $1;

END

$$ LANGUAGE plpgsql STABLE;

CREATE OR REPLACE FUNCTION "last_irecords"("limit" INT)
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
