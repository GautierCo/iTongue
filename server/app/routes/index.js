const express = require("express");

const highlightsRouter = require("./highlights-routes");
const authRouter = require("./auth-routes");
const userRouter = require("./user-routes");
const languageRouter = require("./language-routes");
const expressionRouter = require("./expression-routes");
const translationRouter = require("./translation-routes");
const adminRouter = require("./admin-routes");
const recordRouter = require("./record-routes");
const searchRouter = require("./search-routes");
const commentRouter = require("./comment-routes");

const notFoundMiddleware = require("../middlewares/not-found-middleware");
const errorMiddleware = require("../middlewares/error-middleware");

const router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *      summary: Check router status
 *      description: Check router status
 *      responses:
 *          '200':
 *              description: successful response
 *              content:
 *                  application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                      example:
 *                        message: Router is working
 */
router.get("/", (_, res) => {
  res.json({ data: { message: "Router is working" } });
});

// Route de test pour auth-middleware
router.get("/private", require("../middlewares/auth-middleware"), (_, res) => {
  res.json({ data: { msg: "Authorized" } });
});

// Route de test pour vérification du reCaptcha v3
router.post("/verify", require("../middlewares/recaptcha-middleware"));

router.use("/best", highlightsRouter);

router.use("/search", searchRouter);

router.use("/admin", adminRouter);

router.use("/auth", authRouter);

router.use("/users", userRouter);

router.use("/languages", languageRouter);

router.use("/expressions", expressionRouter);

router.use("/translations", translationRouter);

router.use("/records", recordRouter);

router.use("/comments", commentRouter);

router.use(notFoundMiddleware, errorMiddleware);

module.exports = router;
