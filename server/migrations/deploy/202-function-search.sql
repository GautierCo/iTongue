-- Deploy itongue:202-function-search to pg

BEGIN;

CREATE OR REPLACE FUNCTION "find_users" ("expression" TEXT)
RETURNS TABLE("users" JSON)
AS $$

  SELECT json_agg(to_json("users"))
    FROM (
      SELECT "id", "firstname", "avatar_url" "avatarUrl",
        (
          SELECT json_agg(to_json("r"))
            FROM (
              SELECT "id", "url" "recordUrl", (
                SELECT json_agg(to_json("t"))
                  FROM (
                    SELECT t.id, t.text, (
                      SELECT to_json("e")
                        FROM (
                          SELECT e.id, e.label
                            FROM "expression" "e"
                           WHERE e.id = t.expression_id
                        ) "e"
                    ) AS "expression", (
                      SELECT to_json("l")
                        FROM (
                          SELECT *
                            FROM "language" "l"
                           WHERE l.id = t.language_id
                        ) "l"
                    ) AS "language"
                    FROM "translation" "t"
                    WHERE t.id = r.translation_id
                  ) "t"
              ) AS "translations"
                FROM "record" "r"
               WHERE r.user_id = u.id
            ) "r"
        ) AS "records"
      FROM "user" "u"
     WHERE u.firstname 
     ILIKE '%' || "expression" || '%'
        OR u.lastname
     ILIKE '%' || "expression" || '%'
    ) AS "users";

$$ LANGUAGE SQL STABLE;



CREATE OR REPLACE FUNCTION "find_records" ("expression" TEXT)
RETURNS TABLE("records" JSON)
AS $$

  SELECT json_agg(to_json("records"))
    FROM (
      SELECT r.id, r.url "recordUrl", (
        SELECT to_json("u")
          FROM (
            SELECT u.id, u.firstname, u.lastname, u.slug, u.bio, u.avatar_url "avatarUrl"
              FROM "user" "u"
             WHERE r.user_id = u.id
          ) "u"
      ) AS "user", (
        SELECT to_json("t")
          FROM (
            SELECT t.id, t.text, (
              SELECT to_json("e")
                FROM (
                  SELECT e.id, e.label
                    FROM "expression" "e"
                    WHERE e.id = t.expression_id
                ) "e"
            ) AS "expression", (
              SELECT to_json("l")
                FROM (
                  SELECT *
                    FROM "language" "l"
                    WHERE l.id = t.language_id
                ) "l"
            ) AS "language"
              FROM "translation" "t"
             WHERE t.id = r.translation_id
          ) "t"
      ) AS "translation"
      FROM "record" "r"
      WHERE (
        SELECT TRUE
        FROM "translation" "t"
        WHERE "t"."text"
        ILIKE '%' || "expression" || '%'
      )
    ) AS "records";

$$ LANGUAGE SQL STABLE;



CREATE OR REPLACE FUNCTION "find_users_records" ("expression" TEXT)
RETURNS TABLE("users" JSON, "records" JSON)
AS $$

  SELECT (
    SELECT "find_users"("expression")
    ) AS "users", (
    SELECT "find_records"("expression")
    ) AS "records";

$$ LANGUAGE SQL STABLE;


COMMIT;