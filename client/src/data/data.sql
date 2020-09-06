
/*  */
truncate "record" RESTART IDENTITY CASCADE;

/* UPDATE "user" SET "is_admin" = true WHERE id = 5; */


/* Add User */
INSERT INTO "user" ("email", "password", "firstname", "lastname", "slug", "bio", "avatar_url", "is_admin")
VALUES ('zou8@zou.zou', 'zouzou', 'zou', 'zou', 'zou-zou8', 'bio', 'https://randomuser.me/api/portraits/men/33.jpg', 'false');

/* Add avatar and bio to user ID */
UPDATE "user"
SET "bio" = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum suscipit illo velit ✈️'
, "avatar_url" = 'https://ca.slack-edge.com/TUZFANP45-U0102DYQRUL-b7d05e08f84a-512'
WHERE "id" = 5;

UPDATE "user"
SET "password" = '$2b$10$9C/QPCDYCUIlYKFprCOfqe438k8HOrDbcBlzNyYCph6FjzRKDLR36'
WHERE "id" = 5;

UPDATE "user"
SET "is_admin" = 'true'
WHERE "id" = 5;

$2b$10$3MGDWljaoj6UC8yeW5tdz.OFtCwrhiiU7JQtQmxEasdKOD5xQxCsi
$2b$10$cIsQbeXyb4/tKD3a7fSFXuDCwpjJl3ycH41Kdtwb7D6k82Au4OiMO
$2b$10$9C/QPCDYCUIlYKFprCOfqe438k8HOrDbcBlzNyYCph6FjzRKDLR36

UPDATE "language"
SET "code" = 'gb'
WHERE "id" = 2;



/* Add record */ 
INSERT INTO "record" ("url", "user_id", "translation_id")
VALUES ('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', 
'5', 
'1');

INSERT INTO "record" ("url", "user_id", "translation_id")
VALUES ('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', 
'5', 
'2');

INSERT INTO "record" ("url", "user_id", "translation_id")
VALUES ('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', '9', '5'),
('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', '9', '6'),
('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3', '9', '7'),
('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3', '9', '8');


/* languages */
INSERT INTO "language" ("name", "code")
     VALUES ('Français', 'fr'),
            ('English', 'uk'),
            ('Espagnol', 'es'),
            ('Portuguais', 'pt');

/*add language to user ( teacher || learner ) */

INSERT INTO "language_user" ("language_id", "user_id", "role")
     VALUES ('1', '5', 'teacher'),
     ('2', '5', 'teacher'),
     ('3', '5', 'learner'),
     ('4', '5', 'learner');

DELETE FROM "language"
WHERE id = 6;

UPDATE "language"
SET "name" = 'Français'
WHERE "id" = 1;

   /*         
Pour le back :

GET /records :

id
slug
avatarUrl
firstname
lastname

Créer une route qui retourne des stats pour le dashboard genre: (au lieu de faire 4 requests)
Nombre d'utilisateur total
Nombre d'iRecords total
Nombre de traductions total
Nombre de langues total

*/

1er token : 21h53 connexion
AcessToken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJzbHVnIjoiam9obi1kb2UiLCJhdmF0YXJVcmwiOm51bGwsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1OTg2NDQ0MzgsImV4cCI6MTU5ODY0NTYzOH0.r52j-a6-U_WvtuLXaCZZ_52aqLjw0XOk65goyo3dXX8
RefreshToken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJzbHVnIjoiam9obi1kb2UiLCJhdmF0YXJVcmwiOm51bGwsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1OTg2NDQ0Mzh9.IXNwrknM2VRim509FTuiT6rbb5WuN8unSZsJeB763SY

2er token : 22h15 requete
AcessToken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJzbHVnIjoiam9obi1kb2UiLCJhdmF0YXJVcmwiOm51bGwsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1OTg2NDQ0MzgsImV4cCI6MTU5ODY0NTYzOH0.r52j-a6-U_WvtuLXaCZZ_52aqLjw0XOk65goyo3dXX8
RefreshToken : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJzbHVnIjoiam9obi1kb2UiLCJhdmF0YXJVcmwiOm51bGwsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1OTg2NDQ0Mzh9.IXNwrknM2VRim509FTuiT6rbb5WuN8unSZsJeB763SY



eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJnYXV0aWVyLmNvbGFzc2VAZ21haWwuY29tIiwic2x1ZyI6ImdhdXRpZXItY29sYXNzZSIsImF2YXRhclVybCI6InVwbG9hZHMvYXZhdGFycy85L2UvOC8zLzFmNWU3YTA4YjM0YzVkNDlhNjg1NDRhNzhiY2MiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1OTg4NjQ0NjMsImV4cCI6MTU5ODg2NTY2M30.bz095bXCGy9QelDvz7o1JpBIy0kzwvOPOlyfSyZka7g
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJnYXV0aWVyLmNvbGFzc2VAZ21haWwuY29tIiwic2x1ZyI6ImdhdXRpZXItY29sYXNzZSIsImF2YXRhclVybCI6InVwbG9hZHMvYXZhdGFycy85L2UvOC8zLzFmNWU3YTA4YjM0YzVkNDlhNjg1NDRhNzhiY2MiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1OTg4NjQ0NjMsImV4cCI6MTU5ODg2NTY2M30.bz095bXCGy9QelDvz7o1JpBIy0kzwvOPOlyfSyZka7g
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJnYXV0aWVyLmNvbGFzc2VAZ21haWwuY29tIiwic2x1ZyI6ImdhdXRpZXItY29sYXNzZSIsImF2YXRhclVybCI6InVwbG9hZHMvYXZhdGFycy85L2UvOC8zLzFmNWU3YTA4YjM0YzVkNDlhNjg1NDRhNzhiY2MiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1OTg4NjQ2ODIsImV4cCI6MTU5ODg2NTg4Mn0.IPH-lqTCjV5SgBsLKA8TwkCNIb7GnI_mCjqlxmH7gUI