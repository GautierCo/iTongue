const express = require("express");

const searchController = require("../controllers/search-controller");

const router = express.Router();

/**
 * @swagger
 * /search:
 *  get:
 *      tags: 
 *        - Search
 *      summary: Get matching Users and iRecords
 *      description: This route retrieves matching results for given expression in query string
 *      parameters:
 *        - in: query
 *          name: query
 *          description: expression to query
 *          schema:
 *            type: string
 *          required: true
 *        - in: query
 *          name: type
 *          description: relation(s) to query
 *          schema:
 *            type: string
 *            enum: [all, user, record]
 *            default: all
 *          required: true
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
 *                       {
 *                         "data": [
 *                           {
 *                             "users": [
 *                               {
 *                                 "id": 1,
 *                                 "firstname": "zou",
 *                                 "avatarUrl": "https://randomuser.me/api/portraits/men/33.jpg",
 *                                 "records": [
 *                                   {
 *                                     "id": 2,
 *                                     "recordUrl": "/fake-url",
 *                                     "translations": [
 *                                       {
 *                                         "id": 2,
 *                                         "text": "bonjour",
 *                                         "expression": {
 *                                           "id": 1,
 *                                           "label": "bjr"
 *                                         },
 *                                         "language": {
 *                                           "id": 1,
 *                                           "name": "french",
 *                                           "code": "fr"
 *                                         }
 *                                       }
 *                                     ]
 *                                   },
 *                                   {
 *                                     "id": 3,
 *                                     "recordUrl": "/fake-url-2",
 *                                     "translations": [
 *                                       {
 *                                         "id": 2,
 *                                         "text": "bonjour",
 *                                         "expression": {
 *                                           "id": 1,
 *                                           "label": "bjr"
 *                                         },
 *                                         "language": {
 *                                           "id": 1,
 *                                           "name": "french",
 *                                           "code": "fr"
 *                                         }
 *                                       }
 *                                     ]
 *                                   }
 *                                 ]
 *                               },
 *                               {
 *                                 "id": 2,
 *                                 "firstname": "zou",
 *                                 "avatarUrl": "https://randomuser.me/api/portraits/men/34.jpg",
 *                                 "records": null
 *                               }
 *                             ],
 *                             "records": [
 *                               {
 *                                 "id": 2,
 *                                 "recordUrl": "/fake-url",
 *                                 "user": {
 *                                   "id": 1,
 *                                   "firstname": "zou",
 *                                   "lastname": "zou",
 *                                   "slug": "zou-zou8",
 *                                   "bio": "bio",
 *                                   "avatarUrl": "https://randomuser.me/api/portraits/men/33.jpg"
 *                                 },
 *                                 "translation": {
 *                                   "id": 2,
 *                                   "text": "bonjour",
 *                                   "expression": {
 *                                     "id": 1,
 *                                     "label": "bjr"
 *                                   },
 *                                   "language": {
 *                                     "id": 1,
 *                                     "name": "french",
 *                                     "code": "fr"
 *                                   }
 *                                 }
 *                               }
 *                             ]
 *                           }
 *                         ]
 *                        }
 */
router.get("/", searchController.find);

module.exports = router;

