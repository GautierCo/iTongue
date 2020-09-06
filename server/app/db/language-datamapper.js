const client = require("../redis/cache");

 /**
 * @typedef {Object} Language
 * @property {Number} id - ID of the language
 * @property {String} text - Text of the language
 * @property {Number} expression_id - ID of the relative expression
 * @property {Number} language_id - ID of the relative language
 * @property {String} created_at - Date of creation
 */

/**
 * @typedef {Object} Created
 * @property {Number} id Id of created language
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
   * Create a new language
   * @param {String} name Name of the language
   * @param {String} code Code of the language
   * @returns {Created} Id of the language
   */
  create: async (name, code) => {
    const query = {
      name: `create-language-${code}`,
      text: 'INSERT INTO "language"("name", "code") VALUES($1, $2) RETURNING "id"',
      values: [name, code]
    };
    return await client.query(query);
  },

  /**
   * Find all languages
   * @returns {Language[]} Available languages
   */
  findAll: async () => {
    const query = {
      name: "read-all-languages",
      text: 'SELECT * FROM "language"'
    };
    return await client.query(query);
  },

  /**
   * Find one language by ID
   * @param {Number} id ID of the language
   * @returns {Language} Queried language
   */
  findOneById: async id => {
    const query = {
      name: `read-language-${id}`,
      text: 'SELECT * FROM "language" WHERE "id" = $1',
      values: [id]
    };
    return await client.query(query);
  },

  /**
   * Update one language by ID
   * @param {Number} id ID of the language to update
   * @param {String} name Name of the language
   * @param {String} code Code of the language
   * @returns {Updated} True if success language
   */
  updateOne: async (id, name, code) => {
    const query = {
      name: `update-language-${id}`,
      text: 'SELECT update_language($1, $2, $3) AS "updated"',
      values: [id, name, code]
    };
    return await client.query(query);
  },

  /**
   * Find one languge by name
   * @param {String} name Name of the language
   * @returns {Language} Queried language
   */
  findOneByName: async name => {
    const query = {
      name: `read-language-${name}`,
      text: 'SELECT * FROM "language" WHERE "name" = $1',
      values: [name]
    };
    return await client.query(query);
  },

  /**
   * Find one languges by code
   * @param {String} code Code of the language
   * @returns {Language} Queried language
   */
  findOneByCode: async code => {
    const query = {
      name: `read-language-${code}`,
      text: 'SELECT * FROM "language" WHERE "code" = $1',
      values: [code]
    };
    return await client.query(query);
  },

  /**
   * Find one languges by code
   * @param {Number} id ID of the language to delete
   * @returns {Deleted} True if success
   */
  deleteOne: async id => {
    const query = {
      name: `delete-language-${id}`,
      text: 'SELECT delete_row_from_relation($1, $2) AS "deleted"',
      values: ["language", id]
    };
    return await client.query(query);
  }
};
