const express = require("express");

const recordController = require("../controllers/record-controller");

const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

/**
 * @swagger
 * /records:
 *   get:
 *     tags:
 *       - Records
 *     summary: Show a list of records
 *     description: List of audio files recordes by the iTongue community.
 *     responses:
 *       "200":
 *         description: A JSON array of record objects with their users and translations nested in it
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Record"
 */
router.get("/", recordController.showAll);

/**
 * @swagger
 * /records/{id}/like:
 *   post:
 *     tags:
 *       - Records
 *       - Users
 *       - Likes
 *     security:
 *       - BearerJWT: []
 *     summary: Like a record
 *     description: Add a like to a record.
 *     parameters:
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
 *       "409":
 *         $ref: "#/components/responses/Conflict"
 *   delete:
 *     tags:
 *       - Records
 *       - Users
 *       - Likes
 *     security:
 *       - BearerJWT: []
 *     summary: Cancel a like
 *     description: Remove a user's like from a record.
 *     parameters:
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
 */
router
  .route("/:id/like")
  .post(authMiddleware, recordController.like)
  .delete(authMiddleware, recordController.unlike);

/**
 * @swagger
 * /records/{id}/likes:
 *   get:
 *     tags:
 *       - Records
 *       - Users
 *       - Likes
 *     summary: Users who liked a record
 *     description: Display a list of the users who liked the record.
 *     parameters:
 *       - $ref: "#/components/parameters/RecordPk"
 *     responses:
 *       "200":
 *         description: A JSON array of the users who liked the record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/PlainUser"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "404":
 *         $ref: "#/components/responses/RecordNotFound"
 */
router.get("/:id/likes", recordController.showLikes);

/**
 * @swagger
 * /records/{id}/bookmark:
 *   post:
 *     tags:
 *       - Records
 *       - Users
 *       - Bookmarks
 *     security:
 *       - BearerJWT: []
 *     summary: Bookmark a record
 *     description: Add a record to the user's favorites.
 *     parameters:
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
 *       "409":
 *         $ref: "#/components/responses/Conflict"
 *   delete:
 *     tags:
 *       - Records
 *       - Users
 *       - Bookmarks
 *     security:
 *       - BearerJWT: []
 *     summary: Cancel a bookmark
 *     description: Remove a record from the user's favorites.
 *     parameters:
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
 */
router
  .route("/:id/bookmark")
  .post(authMiddleware, recordController.bookmark)
  .delete(authMiddleware, recordController.unbookmark);

/**
 * @swagger
 * /records/{id}/bookmarks:
 *   get:
 *     tags:
 *       - Records
 *       - Users
 *       - Bookmarks
 *     summary: Users who bookmarked a record
 *     description: Display a list of the users who added the record to their favorites.
 *     parameters:
 *       - $ref: "#/components/parameters/RecordPk"
 *     responses:
 *       "200":
 *         description: A JSON array of the users who bookmarked the record
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/PlainUser"
 *       "400":
 *         $ref: "#/components/responses/BadRequest"
 *       "404":
 *         $ref: "#/components/responses/RecordNotFound"
 */
router.get("/:id/bookmarks", recordController.showBookmarks);

module.exports = router;
