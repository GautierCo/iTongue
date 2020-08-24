const express = require("express");

const adminMiddleware = require("../middlewares/admin-middleware");
const ownerMiddleware = require("../middlewares/owner-middleware");
const validator = require("../middlewares/validator");
const fileUploadMiddleware = require("../middlewares/file-upload-middleware");
const userSchema = require("../schemas/user-schema");
const loginFormSchema = require("../schemas/login-form-schema");
const recordSchema = require("../schemas/record-schema");
const userController = require("../controllers/user-controller");

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
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Show a user profile
 *     description: Information about a user, his records and languages.
 *     parameters:
 *     - in: path
 *       $ref: "#/components/parameters/UserPk"
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
 *     - in: path
 *       $ref: "#/components/parameters/UserPk"
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
 *     - in: path
 *       $ref: "#/components/parameters/UserPk"
 *     responses:
 *       "204":
 *         $ref: "#/components/responses/NoContent"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
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
router.get("/:slug([a-z\\d]+(?:-[a-z\\d]+)*)", userController.showOne);

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
 *     - in: path
 *       $ref: "#/components/parameters/UserPk"
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
 *     - in: path
 *       $ref: "#/components/parameters/UserPk"
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
 *     - in: path
 *       $ref: "#/components/parameters/UserPk"
 *     - in: path
 *       $ref: "#/components/parameters/LanguagePk"
 *     - in: path
 *       name: role
 *       schema:
 *         type: string
 *         enum: [learner, teacher]
 *       required: true
 *       description: Indicates which type of language to remove, a learned or a taught one.
 *     responses:
 *       "204":
 *         $ref: "#/components/responses/NoContent"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
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
 *     - in: path
 *       $ref: "#/components/parameters/UserPk"
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
 *         description: Success. An object containing the url to the newly upladed profile picture.
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
 *     - in: path
 *       $ref: "#/components/parameters/UserPk"
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
 *         description: Success. An object containing the url to the newly upladed profile picture.
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
 *     - in: path
 *       $ref: "#/components/parameters/UserPk"
 *     - in: path
 *       $ref: "#/components/parameters/RecordPk"
 *     responses:
 *       "204":
 *         $ref: "#/components/responses/NoContent"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "404":
 *         $ref: "#/components/responses/RecordNotFound"
 */
router.delete("/:id/record/:recordId", ownerMiddleware, userController.removeRecord);

module.exports = router;
