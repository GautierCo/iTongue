-- Revert itongue:501-add-subscription-counts-to-user-display from pg

BEGIN;

DROP VIEW "user_display", "user_with_relations";

CREATE VIEW "user_with_relations" AS
SELECT "u".*,
 	     (SELECT COALESCE(json_agg(("r"."id", "r"."url", "r"."createdAt", "r"."englishTranslation", "r"."translation")::"user_record") FILTER(WHERE "r"."id" IS NOT NULL), '[]')
		     FROM "record_display" "r"
	 	     WHERE "u"."id" = ("r"."user"->>'id')::INT ) AS "records",
	     (SELECT COALESCE(json_agg("l".*) FILTER(WHERE "lu"."role" = 'learner'), '[]')
		      FROM "language_user" "lu"
		      JOIN "language" "l"
            ON "lu"."language_id" = "l"."id"
		     WHERE "lu"."user_id" = "u"."id") AS "learnedLanguages",
       (SELECT COALESCE(json_agg("l".*) FILTER(WHERE "lu"."role" = 'teacher'), '[]')
		      FROM "language_user" "lu"
		      JOIN "language" "l" ON "lu"."language_id" = "l"."id"
		     WHERE "lu"."user_id" = "u"."id") AS "taughtLanguages"
  FROM "user" "u";

CREATE VIEW "user_display" AS
     SELECT "id", "email", "firstname", "lastname", "bio", "slug", "avatar_url" AS "avatarUrl", "is_admin" AS "isAdmin", "created_at" AS "createdAt", "records", "learnedLanguages", "taughtLanguages"
       FROM "user_with_relations";

COMMIT;