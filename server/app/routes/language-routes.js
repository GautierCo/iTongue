const express = require("express");

const languageController = require("../controllers/language-controller");

const router = express.Router();

/**
 * @swagger
 * /languages:
 *  get:
 *      tags: 
 *        - Languages
 *      summary: Get all languages
 *      description: This route serves all languages - Array of objects
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: integer
 *                        name:
 *                           type: string
 *                        code:
 *                           type: string
 *                    example:
 *                       datas: [ 
 *                          { 
 *                            id: 1,
 *                            name: french,
 *                            code: fr
 *                          },
 *                          { 
 *                            id: 2,
 *                            name: spanish,
 *                            code: es_ES
 *                          },
 *                       ]
 */
router.get("/", languageController.getAll);

/**
 * @swagger
 * /languages/{id}:
 *  get:
 *      tags: 
 *        - Languages
 *      summary: Get one language
 *      description: This route serves one language
 *      parameters:
 *        - name: id
 *          description: id to get language by
 *          in: path
 *          type: integer
 *          required: true
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                      name:
 *                         type: string
 *                      code:
 *                         type: string
 *                    example:
 *                       datas: { 
 *                            id: 1,
 *                            name: french,
 *                            code: fr
 *                          }
 */
router.get("/:id([0-9]+)", languageController.getOne);

module.exports = router;
