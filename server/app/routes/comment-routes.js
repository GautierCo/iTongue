const express = require("express");

const authMiddleware = require("../middlewares/auth-middleware");
const commentController = require("../controllers/comment-controller");
const router = express.Router();

/**
 * @swagger
 * /comments/{recordId}:
 *   get:
 *     tags:
 *       - Comments
 *     parameters:
 *       - $ref: "#/components/parameters/RecordID"
 *     summary: Get comments from a record
 *     description: Retrieves all comments from a single record
 *     responses:
 *       "200":
 *         description: Success. An object containing the detail of the user activity.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Comments"
 */
router.get("/:recordId(\\d+)", commentController.showAllByRecordId);

/**
 * @swagger
 * /comments/{recordId}:
 *   post:
 *     tags:
 *       - Comments
 *     security:
 *       - BearerJWT: []
 *     parameters:
 *       - $ref: "#/components/parameters/RecordID"
 *       - $ref: "#/components/parameters/CommentText"
 *     summary: Add comment
 *     description: Allows user to add a comment on a record
 *     responses:
 *       "204":
 *         description: Ok
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 */
router.post("/:recordId(\\d+)", authMiddleware, commentController.create);

/**
 * @swagger
 * /comments/update/{commentId}:
 *   post:
 *     tags:
 *       - Comments
 *     security:
 *       - BearerJWT: []
 *     parameters:
 *       - $ref: "#/components/parameters/CommentID"
 *       - $ref: "#/components/parameters/CommentText"
 *     summary: Update comment
 *     description: Allows user to update an existant comment of his on a record
 *     responses:
 *       "204":
 *         description: Ok
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *         description: Ok
 *       "404":
 *         $ref: "#/components/responses/RecordNotFound"
 */
router.post("/update/:commentId(\\d+)/", authMiddleware, commentController.update);

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     tags:
 *       - Comments
 *     security:
 *       - BearerJWT: []
 *     parameters:
 *       - $ref: "#/components/parameters/CommentID"
 *     summary: Delete comment
 *     description: Allows user to delete an existant comment of his on a record
 *     responses:
 *       "204":
 *         description: Ok
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 *       "404":
 *         $ref: "#/components/responses/RecordNotFound"
 */
router.delete("/:commentId(\\d+)", authMiddleware, commentController.delete);

module.exports = router;
