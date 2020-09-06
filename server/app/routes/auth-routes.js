const express = require("express");

const authController = require("../controllers/auth-controller");

const router = express.Router();

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     tags:
 *       - Users
 *       - Auth
 *     security:
 *       - BearerJWT: []
 *     summary: Access token refresh
 *     description: Generating a new user access token when the old one has expired, using the refresh token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 $ref: "#/components/schemas/JWT"
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 $ref: "#/components/schemas/JWT"
 *     responses:
 *       "200":
 *         description: Success. An object containing the new access token.
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
 *       "401":
 *         $ref: "#/components/responses/Unauthorized"
 *       "403":
 *         $ref: "#/components/responses/Forbidden"
 */
router.post("/refresh", authController.refresh);

router.post("/refresh/invalidate", authController.invalidateRefreshToken);
router.post("/access/invalidate", authController.invalidateAccessToken);

module.exports = router;
