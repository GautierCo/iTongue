const express = require("express");

const adminMiddleware = require("../middlewares/admin-middleware");
const ownerMiddleware = require("../middlewares/owner-middleware");
const validator = require("../middlewares/validator");
const fileUploadMiddleware = require("../middlewares/file-upload-middleware");
const userSchema = require("../schemas/user-schema");
const loginFormSchema = require("../schemas/login-form-schema");
const recordSchema = require("../schemas/record-schema");
const userController = require("../controllers/user-controller");
const authController = require("../controllers/auth-controller");

const router = express.Router();

// TODO évaluer pour chaque route la pertinence du middleware validator

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Show a list of users
 *     description: List of **users** with detail about their activity on the app
 *     responses:
 *       "200":
 *         description: A JSON array of user objects with their records and languages nested in it
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/User"
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     description: Registration form submission. Returns the primary key of the newly created user if no error occurs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/NewUser"
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/NewUser"
 *     responses:
 *       "201":
 *         $ref: "#components/responses/CreatedUser"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "409":
 *         $ref: "#/components/responses/Conflict"
 */
router.route("/").get(userController.showAll).post(validator(userSchema), userController.create);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *       - Auth
 *     summary: Authenticate a user
 *     description: Login form submission. Returns the logged user if the authentication process succeeds.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginForm"
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/LoginForm"
 *     responses:
 *       "200":
 *         description: Success. An object containing the access token, the refresh token and the logged user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       $ref: "#/components/schemas/JWT"
 *                     refreshToken:
 *                       $ref: "#/components/schemas/JWT"
 *                     user:
 *                      $ref: "#/components/schemas/User"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 */
router.post("/login", validator(loginFormSchema), userController.login);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     tags:
 *       - Users
 *       - Auth
 *     security:
 *       - BearerJWT: []
 *     summary: Logout a user
 *     description: User tokens invalidation.
 *     responses:
 *       "204":
 *         $ref: "#/components/responses/NoContent"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 */
router.post("/logout", authController.logout);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Show a user profile
 *     description: Information about a user, his records and languages.
 *     parameters:
 *       - $ref: "#/components/parameters/UserPk"
 *     responses:
 *       "200":
 *         description: Success. An object containing the detail of the user activity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                      $ref: "#/components/schemas/User"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "404":
 *         $ref: "#/components/responses/UserNotFound"
 *   post:
 *     tags:
 *       - Users
 *     security:
 *       - BearerJWT: []
 *     summary: Update a user profile
 *     description: Profile edit form submission. Modification possiblities include the learned and taught languages, password, name, and bio.
 *     parameters:
 *       - $ref: "#/components/parameters/UserPk"
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdatedUser"
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/UpdatedUser"
 *     responses:
 *       "200":
 *         description: Success. An object containing the new access token and refresh token taking into account the amendments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       $ref: "#/components/schemas/JWT"
 *                     refreshToken:
 *                       $ref: "#/components/schemas/JWT"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *       "404":
 *         $ref: "#/components/responses/UserNotFound"
 *   delete:
 *     tags:
 *       - Users
 *     security:
 *       - BearerJWT: []
 *     summary: Delete a user account
 *     description: User account deletion. This operation requires administrator rights.
 *     parameters:
 *       - $ref: "#/components/parameters/UserPk"
 *     responses:
 *       "204":
 *         $ref: "#/components/responses/NoContent"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *       "404":
 *         $ref: "#/components/responses/UserNotFound"
 */
router
  .route("/:id(\\d+)")
  .get(userController.showOne)
  .post(ownerMiddleware, validator(userSchema), userController.editProfile)
  .delete(adminMiddleware, userController.deleteOne);

/**
 * @swagger
 * /users/{slug}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Show a user profile
 *     description: Information about a user, his records and languages
 *     parameters:
 *      - in: path
 *        name: slug
 *        schema:
 *          $ref: "#/components/schemas/Slug"
 *        required: true
 *        description: Slug of the user to get.
 *     responses:
 *       "200":
 *         description: Success. An object containing the detail of the user activity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                      $ref: "#/components/schemas/User"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "404":
 *         $ref: "#/components/responses/UserNotFound"
 */
router.get("/:slug([-a-z\\d]+)", userController.showOne);

/**
 * @swagger
 * /users/{id}/slug:
 *   post:
 *     tags:
 *       - Users
 *     security:
 *       - BearerJWT: []
 *     summary: Edit the user custom slug
 *     description: User slug edit form submission. Updates the slug if there is no conflict in database, suggests an available one otherwise.
 *     parameters:
 *       - $ref: "#/components/parameters/UserPk"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slug:
 *                 $ref: "#/components/schemas/Slug"
 *             required:
 *               -slug
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               slug:
 *                 $ref: "#/components/schemas/Slug"
 *             required:
 *               -slug
 *     responses:
 *       "204":
 *         $ref: "#/components/responses/NoContent"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *       "404":
 *         $ref: "#/components/responses/UserNotFound"
 *       "409":
 *         description: Conflict. The requested slug is already in use.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     availableSlug:
 *                       $ref: "#/components/schemas/Slug"
 */
router.post("/:id(\\d+)/slug", ownerMiddleware, validator(userSchema), userController.updateSlug);

/**
 * @swagger
 * /users/{id}/language:
 *   post:
 *     tags:
 *       - Users
 *       - Languages
 *     security:
 *       - BearerJWT: []
 *     summary: Add a language to a user
 *     description: Add a new language to a user. It can be a learned language or a tauthgt one.
 *     parameters:
 *       - $ref: "#/components/parameters/UserPk"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UserLanguage"
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: "#/components/schemas/UserLanguage"
 *     responses:
 *       "201":
 *         $ref: "#/components/responses/CreatedLanguage"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *       "404":
 *         $ref: "#/components/responses/UserNotFound"
 *       "409":
 *         $ref: "#/components/responses/Conflict"
 */
router.post("/:id(\\d+)/language", ownerMiddleware, userController.addLanguage);

/**
 * @swagger
 * /users/{id}/languagage/{languageId}/{role}:
 *   delete:
 *     tags:
 *       - Users
 *       - Languages
 *     security:
 *       - BearerJWT: []
 *     summary: Delete a user language
 *     description: User language deletion. Removal of one of the user learned or taught languages.
 *     parameters:
 *       - $ref: "#/components/parameters/UserPk"
 *       - $ref: "#/components/parameters/LanguagePk"
 *       - in: path
 *         name: role
 *         schema:
 *           type: string
 *           enum: [learner, teacher]
 *         required: true
 *         description: Indicates which type of language to remove, a learned or a taught one.
 *     responses:
 *       "204":
 *         $ref: "#/components/responses/NoContent"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 */
router.delete(
  "/:id(\\d+)/language/:languageId(\\d+)/:role",
  ownerMiddleware,
  userController.removeLanguage
);

/**
 * @swagger
 * /users/{id}/avatar:
 *   post:
 *     tags:
 *       - Users
 *     security:
 *       - BearerJWT: []
 *     summary: Update the user profile picture
 *     description: Image file upload to replace the user profile picture.
 *     parameters:
 *       - $ref: "#/components/parameters/UserPk"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload.
 *             required:
 *               - avatar
 *           encoding:
 *             avatar:
 *               contentType: image/png, image/jpeg
 *     responses:
 *       "200":
 *         description: Success. An object containing the url to the newly uploaded profile picture.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     avatarUrl:
 *                      $ref: "#/components/schemas/URL"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *       "404":
 *         $ref: "#/components/responses/UserNotFound"
 */
router.post(
  "/:id(\\d+)/avatar",
  ownerMiddleware,
  fileUploadMiddleware("avatar"),
  userController.updateAvatar
);

/**
 * @swagger
 * /users/{id}/record:
 *   post:
 *     tags:
 *       - Users
 *       - Records
 *     security:
 *       - BearerJWT: []
 *     summary: Upload a user record
 *     description: Uploading an audio file corresponding to a new recording of a translation by a user.
 *     parameters:
 *       - $ref: "#/components/parameters/UserPk"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               record:
 *                 type: string
 *                 format: binary
 *                 description: The audio file to upload.
 *               translation_id:
 *                 $ref: "#/components/schemas/TranslationPk"
 *             required:
 *               - record
 *               - translation_id
 *           encoding:
 *             record:
 *               contentType: audio/mp3, audio/mpeg
 *     responses:
 *       "200":
 *         description: Success. An object containing the detail of the newly uploaded record.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     record:
 *                      $ref: "#/components/schemas/UserRecord"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *       "404":
 *         $ref: "#/components/responses/UserNotFound"
 */
router.post(
  "/:id(\\d+)/record",
  ownerMiddleware,
  fileUploadMiddleware("record"),
  validator(recordSchema),
  userController.addRecord
);

/**
 * @swagger
 * /users/{id}/record/{recordId}:
 *   delete:
 *     tags:
 *       - Users
 *       - Records
 *     security:
 *       - BearerJWT: []
 *     summary: Delete a user record
 *     description: User record deletion. Removal of one of the user records.
 *     parameters:
 *       - $ref: "#/components/parameters/UserPk"
 *       - $ref: "#/components/parameters/RecordPk"
 *     responses:
 *       "204":
 *         $ref: "#/components/responses/NoContent"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *       "404":
 *         $ref: "#/components/responses/RecordNotFound"
 */
router.delete("/:id/record/:recordId", ownerMiddleware, userController.removeRecord);

/**
 * @swagger
 * /users/{id}/follow:
 *   post:
 *     tags:
 *       - Users
 *     security:
 *       - BearerJWT: []
 *     summary: Follow a user
 *     description: Subscribes to an other user activity.
 *     parameters:
 *       - $ref: "#/components/parameters/UserPk"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followedId:
 *                 $ref: "#/components/schemas/PrimaryKey"
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               followedId:
 *                 $ref: "#/components/schemas/PrimaryKey"
 *     responses:
 *       "204":
 *         $ref: "#/components/responses/NoContent"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *       "404":
 *         $ref: "#/components/responses/UserNotFound"
 *       "409":
 *         $ref: "#/components/reponses/Conflict"
 */
router.post("/:id(\\d+)/follow", ownerMiddleware, userController.follow);

/**
 * @swagger
 * /users/{id}/follow/{followedId}:
 *   delete:
 *     tags:
 *       - Users
 *     security:
 *       - BearerJWT: []
 *     summary: Unsubscribe from an other user
 *     description: Unsubscibe from an other user.
 *     parameters:
 *       - $ref: "#/components/parameters/UserPk"
 *       - in: path
 *         name: followedId
 *         schema:
 *           $ref: "#components/schemas/PrimaryKey"
 *         required: true
 *         description: Primary key of the user to follow.
 *     responses:
 *       "204":
 *         $ref: "#/components/responses/NoContent"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 */
router.delete("/:id(\\d+)/follow/:followedId(\\d+)", ownerMiddleware, userController.unfollow);

/**
 * @swagger
 * /users/{id}/followers:
 *   get:
 *     tags:
 *       - Users
 *     summary: Display user's followers
 *     description: Display a list of user's followers.
 *     parameters:
 *       - in: path
 *         name: user Id
 *         schema:
 *           $ref: "#components/schemas/PrimaryKey"
 *         required: true
 *         description: Primary key of the user to get followers
 *     responses:
 *       "200":
 *         description: List of followers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/UsersFollow"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "404":
 *         $ref: "#/components/responses/UserNotFound"
 */
router.get("/:id(\\d+)/followers", userController.showFollowers);

/**
 * @swagger
 * /users/{id}/followed:
 *   get:
 *     tags:
 *       - Users
 *     summary: Display followed users
 *     description: Display all user's followed by given user id in path
 *     parameters:
 *       - in: path
 *         name: user Id
 *         schema:
 *           $ref: "#components/schemas/PrimaryKey"
 *         required: true
 *         description: Primary key of the followed user
 *     responses:
 *       "200":
 *         description: List of followed users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/UsersFollow"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "404":
 *         $ref: "#/components/responses/UserNotFound"
 */
router.get("/:id(\\d+)/followed", userController.showFollowed);

/**
 * @swagger
 * /users/{id}/feed:
 *   get:
 *     tags:
 *       - Users
 *     security:
 *       - BearerJWT: []
 *     summary: Display followed users
 *     description: Display fresh irecords from followed users
 *     parameters:
 *       - in: path
 *         name: user Id
 *         schema:
 *           $ref: "#components/schemas/PrimaryKey"
 *         required: true
 *         description: Primary key of the feed user
 *     responses:
 *       "200":
 *         description: Feed of logged user with fresh irecords from his followed users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Record"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *       "404":
 *         $ref: "#/components/responses/UserNotFound"
 */
router.get("/:id(\\d+)/feed", ownerMiddleware, userController.showFeed);

/**
 * @swagger
 * /users/{id}/likes:
 *   get:
 *     tags:
 *       - Users
 *       - Records
 *       - Likes
 *     security:
 *       - BearerJWT: []
 *     summary: User liked records
 *     description: Display a list of a user's liked records.
 *     parameters:
 *       - $ref: "#/components/parameters/UserPk"
 *     responses:
 *       "200":
 *         description: A JSON array of the user's liked records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Records"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *       "404":
 *         $ref: "#/components/responses/UserNotFound"
 */
router.get("/:id(\\d+)/likes", ownerMiddleware, userController.showLikes);

/**
 * @swagger
 * /users/{id}/bookmarks:
 *   get:
 *     tags:
 *       - Users
 *       - Records
 *       - Bookmarks
 *     security:
 *       - BearerJWT: []
 *     summary: User bookmarked records
 *     description: Display a list of a user's bookmarked records.
 *     parameters:
 *       - $ref: "#/components/parameters/UserPk"
 *     responses:
 *       "200":
 *         description: A JSON array of the user's bookmarked records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Records"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *       "404":
 *         $ref: "#/components/responses/UserNotFound"
 */
router.get("/:id(\\d+)/bookmarks", ownerMiddleware, userController.showBookmarks);

router.get("/:id(\\d+)/threads", ownerMiddleware, userController.showThreads);

router.get("/:id(\\d+)/threads/:contactId", ownerMiddleware, userController.showThread);

module.exports = router;
