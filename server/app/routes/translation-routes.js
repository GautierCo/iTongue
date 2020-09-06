const express = require("express");

const translationController = require("../controllers/translation-controller");

const router = express.Router();

/**
 * @swagger
 * /translations:
 *  get:
 *      tags: 
 *        - Translations
 *      summary: Get all translations
 *      description: Get all translations
 *      responses:
 *          '200':
 *              description: OK
 */
router.get("/", translationController.getAll);

/**
 * @swagger
 * /translations/{id}:
 *  get:
 *      tags: 
 *        - Translations
 *      summary: Get one translation
 *      description: Get one specific translation by id
 *      parameters:
 *        - name: id
 *          description: id to get translation by
 *          in: path
 *          type: integer
 *          required: true
 *      responses:
 *          '200':
 *              description: OK
 *          '404':
 *              description: Not Found
 */
router.get("/:id([0-9]+)", translationController.getOneById);

module.exports = router;
