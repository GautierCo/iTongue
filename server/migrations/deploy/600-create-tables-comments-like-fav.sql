-- Deploy itongue:600-create-tables-comments-like-fav to pg

BEGIN;

CREATE TABLE "record_user_like" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "record_id" INT NOT NULL REFERENCES "record"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "unique_record_like" UNIQUE ("user_id", "record_id")
);


CREATE TABLE "record_user_bookmark" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "record_id" INT NOT NULL REFERENCES "record"("id") ON DELETE CASCADE,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "unique_record_bookmark" UNIQUE ("user_id", "record_id")
);

CREATE TABLE "record_comment" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "record_id" INT NOT NULL REFERENCES "record"("id") ON DELETE CASCADE,
  "text" TEXT NOT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COMMIT;
