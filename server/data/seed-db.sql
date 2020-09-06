BEGIN;

TRUNCATE "record", "language_user", "translation", "expression", "language", "user" RESTART IDENTITY;

INSERT INTO "user" ("email", "password", "firstname", "lastname", "slug", "is_admin")
     VALUES ('zou@zou.zou', '$2y$10$gbQppLpmkTcmG1jA6oyx3OSci/yqt3zhlVJ4YtmmhbF5FcdrJ/9Mi', 'zou', 'zou', 'zou-zou', FALSE),
            ('blou@blou.blou', '$2y$10$ohiCI5trUIJ8n16.MK1AaO6pxPnf6Lrd0Mgnv0Q63IwJTx6hlxp4K', 'blou', 'blou', 'blou-blou', FALSE),
            ('flou@flou.flou', '$2y$10$0TUCka7/cRFiuQXWu1VfoetnD1onGKDOMbcj2AUEE6VTMRssu2GVW', 'flou', 'flou', 'flou-flou', FALSE);

INSERT INTO "language" ("name", "code")
     VALUES ('français', 'fr'),
            ('english', 'en');

INSERT INTO "expression" ("label")
     VALUES ('salut'),
            ('au revoir');

INSERT INTO "translation" ("text", "expression_id", "language_id")
     VALUES ('bonjour à toi', 1, 1),
            ('good bye', 2, 2);

INSERT INTO "language_user" ("language_id", "user_id", "role")
     VALUES (1, 1, 'learner'),
            (1, 2, 'teacher');

INSERT INTO "record" ("url", "user_id", "translation_id")
     VALUES ('zou.mp3', 1, 1),
            ('blou.wav', 2, 2);

COMMIT;