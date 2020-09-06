const express = require("express");

const expressionController = require("../controllers/expression-controller");

const router = express.Router();

/**
 * @swagger
 * /expressions:
 *  get:
 *      tags: 
 *        - Expressions
 *      summary: Get all expressions
 *      description: This route serves all expressions - Array of objects
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
 *                          readOnly: true
 *                        label:
 *                           type: string
 *                        createdAt:
 *                           type: string
 *                    uniqueItems: true
 *                    example:
 *                       datas: [ 
 *                          { 
 *                            id: 1,
 *                            label: bjr,
 *                            createdAt: 2020-08-19T11:44:20.590Z
 *                          },
 *                          { 
 *                            id: 2,
 *                            label: bye,
 *                            createdAt: 2020-08-19T11:48:20.590Z
 *                          },
 *                       ]
 */
router.get("/", expressionController.getAll);

/**
 * @swagger
 * /expressions/{id}:
 *  get:
 *      tags: 
 *        - Expressions
 *      summary: Get one expression (todo)
 *      description:
 *        Get one specific expression by id
 *      parameters:
 *        - name: id
 *          description: id of the expression
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
 *                        readOnly: true
 *                      label:
 *                         type: string
 *                      createdAt:
 *                         type: string
 *                  example:
 *                    id: 1
 *                    label: bjr
 *                    createdAt: 2020-08-19T11:44:20.590Z
 *          '404':
 *              description: Not Found
 */
router.get("/:id([0-9]+)", expressionController.getOneById);

module.exports = router;
