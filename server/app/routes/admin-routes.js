const express = require("express");

const validator = require("../middlewares/validator");
const languageSchema = require("../schemas/language-schema");
const expressionSchema = require("../schemas/expression-schema");
const translationSchema = require("../schemas/translation-schema");
const languageController = require("../controllers/language-controller");
const expressionController = require("../controllers/expression-controller");
const translationController = require("../controllers/translation-controller");
const adminController = require("../controllers/admin-controller");
const adminMiddleware = require("../middlewares/admin-middleware");

const router = express.Router();

router.use(adminMiddleware);

/**
 * @swagger
 * /admin:
 *   get:
 *     tags:
 *       - Users
 *       - Records
 *       - Languages
 *       - Translations
 *     security:
 *       - BearerJWT: []
 *     summary: Show information about app activity
 *     description: Administration dashboard with general information about users, records, languages and translations.
 *     responses:
 *       "200":
 *         description: A JSON array containing the total count of users, records, translations and languages, a list of the last registered users and the most recent records.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     userCount:
 *                       type: integer
 *                       example: 54887
 *                     recordCount:
 *                       type: integer
 *                       example: 122462
 *                     languageCount:
 *                       type: integer
 *                       example: 18
 *                     translationCount:
 *                       type: integer
 *                       example: 22342
 *                     recentUsers:
 *                       type: array
 *                       items:
 *                         $ref: "#/components/schemas/PlainUser"
 *                     recentRecords:
 *                       type: array
 *                       items:
 *                         $ref: "#/components/schemas/DashboardRecord"
 */
router.get("/", adminController.getDashboard);

/**
 * @swagger
 * /admin/languages:
 *  post:
 *      tags:
 *        - Languages
 *      security:
 *       - BearerJWT: []
 *      summary: Add one language
 *      description: This routes in made for creating new languages
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/NewLanguage"
 *      responses:
 *          '201':
 *              description: ID of created language
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: "#/components/schemas/ID"
 *          '401':
 *              description: Unauthorized
 */
router.post("/languages", validator(languageSchema), languageController.create);

/**
 * @swagger
 * /admin/languages/{id}:
 *  post:
 *      tags:
 *        - Languages
 *      security:
 *       - BearerJWT: []
 *      summary: Update one language
 *      description: This route updates one language
 *      parameters:
 *        - $ref: "#/components/parameters/LanguageID"
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Language"
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: "#/components/schemas/Updated"
 */
router.post("/languages/:id([0-9]+)", validator(languageSchema), languageController.update);

/**
 * @swagger
 * /admin/languages/{id}:
 *  delete:
 *      tags:
 *        - Languages
 *      security:
 *       - BearerJWT: []
 *      summary: Delete one language
 *      description: This route deletes one language
 *      parameters:
 *        - $ref: "#/components/parameters/LanguageID"
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: "#/components/schemas/Deleted"
 */
router.delete("/languages/:id([0-9]+)", languageController.delete);

/**
 * @swagger
 * /admin/expressions:
 *  post:
 *      tags:
 *        - Expressions
 *      security:
 *       - BearerJWT: []
 *      summary: Add one expression
 *      description: This routes in made for creating new expressions
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/NewExpression"
 *      responses:
 *          '201':
 *              description: Id of created expression
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: "#/components/schemas/ID"
 *          '401':
 *              description: Unauthorized
 */
router.post("/expressions", validator(expressionSchema), expressionController.create);

/**
 * @swagger
 * /admin/expressions/{id}:
 *  post:
 *      tags:
 *        - Expressions
 *      security:
 *       - BearerJWT: []
 *      summary: Update one expression
 *      description: This routes in made for updating one expression
 *      parameters:
 *        - $ref: "#/components/parameters/ExpressionID"
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                label:
 *                  type: string
 *              required:
 *                - label
 *            examples:
 *              bjr:
 *                value:
 *                  label: bjr
 *      responses:
 *          '200':
 *              description: Expression updated successfully
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: "#/components/schemas/Updated"
 *          '401':
 *              description: Unauthorized
 *          '409':
 *              description: Conflict
 */
router.post("/expressions/:id([0-9]+)", validator(expressionSchema), expressionController.update);

/**
 * @swagger
 * /admin/expressions/{id}:
 *  delete:
 *      tags:
 *        - Expressions
 *      security:
 *       - BearerJWT: []
 *      summary: Delete one expression
 *      description: This routes in made for deleting one expression
 *      parameters:
 *        - $ref: "#/components/parameters/ExpressionID"
 *      responses:
 *          '204':
 *              description: Expression deleted successfully
 *          '401':
 *              description: Unauthorized
 */
router.delete("/expressions/:id([0-9]+)", expressionController.deleteOne);

/**
 * @swagger
 * /admin/translations:
 *  post:
 *      tags:
 *        - Translations
 *      security:
 *       - BearerJWT: []
 *      summary: Add one translation
 *      description: This routes in made for creating new translations
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                text:
 *                  type: string
 *                expression_id:
 *                  type: integer
 *                language_id:
 *                  type: integer
 *              required:
 *                - text
 *                - expression_id
 *                - language_id
 *            examples:
 *              bonjour:
 *                value:
 *                  text: Bonjour
 *                  expression_id: 2
 *                  language_id: 1
 *              hello:
 *                value:
 *                  text: Hello
 *                  expression_id: 2
 *                  language_id: 2
 *      responses:
 *          '201':
 *              description: Created translation object
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        readOnly: true
 *                      text:
 *                        type: string
 *                      expression_id:
 *                        type: integer
 *                      language_id:
 *                        type: integer
 *                    example:
 *                      id: 8
 *                      text: Hello
 *                      expression_id: 2
 *                      language_id: 2
 *          '401':
 *              description: Unauthorized
 *          '409':
 *              description: Conflict
 */
router.post("/translations", validator(translationSchema), translationController.create);

/**
 * @swagger
 * /admin/translations/{id}:
 *  post:
 *      tags:
 *        - Translations
 *      security:
 *       - BearerJWT: []
 *      summary: Update one translation
 *      description: This routes in made for updating one translation
 *      parameters:
 *        - $ref: "#/components/parameters/TranslationID"
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                text:
 *                  type: string
 *                expression_id:
 *                  type: integer
 *                language_id:
 *                  type: integer
 *              required:
 *                - text
 *                - expression_id
 *                - language_id
 *            examples:
 *              bonjour:
 *                value:
 *                  text: Bonjour
 *                  expression_id: 2
 *                  language_id: 1
 *              hello:
 *                value:
 *                  text: Hello
 *                  expression_id: 2
 *                  language_id: 2
 *      responses:
 *          '200':
 *              description: Translation updated successfully
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: "#/components/schemas/Updated"
 *          '401':
 *              description: Unauthorized
 *          '409':
 *              description: Conflict
 */
router.post("/translations/:id(\\d+)", validator(translationSchema), translationController.update);

/**
 * @swagger
 * /admin/translations/{id}:
 *  delete:
 *      tags:
 *        - Translations
 *      security:
 *       - BearerJWT: []
 *      summary: Delete one translation
 *      description: This routes in made for deleting one translation
 *      parameters:
 *        - $ref: "#/components/parameters/TranslationID"
 *      responses:
 *          '204':
 *              description: Translation deleted successfully
 *          '401':
 *              description: Unauthorized
 */
router.delete("/translations/:id([0-9]+)", translationController.deleteOne);

module.exports = router;
