const client = require("../redis/cache");

 /**
 * @typedef {Object} Translation
 * @property {Number} id ID of the translation
 * @property {String} text Text of the translation
 * @property {Number} expression_id ID of the relative expression
 * @property {Number} language_id ID of the relative language
 * @property {String} created_at Date of creation
 */

/**
 * @typedef {Object} TranslationValues
 * @property {String} text Text of the translation
 * @property {Number} expression_id ID of the relative expression
 * @property {Number} language_id ID of the relative language
 */

/**
 * @typedef {Object} Created
 * @property {Number} id ID of created translation
 */

/**
* @typedef {Object} Updated
* @property {Boolean} updated True if succes
*/

 /**
 * @typedef {Object} Deleted
 * @property {Boolean} deleted True if succes
 */

module.exports = {
  /**
   * Create a new translation
   * @param {TranslationValues} translationValues Text, expression_id and language_id
   * @returns {Created} New translation ID
   */
  create: async translationValues => {
    const query = {
      name: `create-translation-${translationValues.text}`,
      text: 'SELECT "insert_translation"($1) AS "id"',
      values: [translationValues]
    };
    return await client.query(query);
  },

  /**
   * Update one translation by ID
   * @param {Number} id ID of the translation to update
   * @param {String} text New text of the translation
   * @param {Number} expression_id ID of the expression related to the translation
   * @param {Number} language_id ID of the language related to the translation
   * @returns {Updated} True if success
   */
  updateOne: async (id, text, expression_id, language_id) => {
    const query = {
      name: `update-translation-${id}`,
      text: 'SELECT update_translation($1, $2, $3, $4) AS "updated"',
      values: [id, text, expression_id, language_id]
    };
    return await client.query(query);
  },

  /**
   * Find all translations
   * @returns {Translation[]} Available translations
   */
  findAll: async () => {
    const query = {
      name: "read-all-translations",
      text: 'SELECT * FROM "translation"'
    };
    return await client.query(query);
  },

  /**
   * Find translation by ID
   * @param {Number} id ID of the translation to find by
   * @returns {Translation} Queried translation
   */
  findOneById: async id => {
    const query = {
      name: `read-translation-${id}`,
      text: 'SELECT * FROM "translation" WHERE "id" = $1',
      values: [id]
    };
    return await client.query(query);
  },

  /**
   * Delete one translation by ID
   * @param {Number} id ID of the translation to delete
   * @returns {Deleted} True if success
   */
  deleteOne: async id => {
    const query = {
      name: `delete-translation-${id}`,
      text: 'SELECT delete_row_from_relation($1, $2) AS "deleted"',
      values: ["translation", id]
    };
    return await client.query(query);
  }
};