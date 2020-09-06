const client = require("../redis/cache");

/**
 * @typedef {Object} Expression
 * @property {Number} id ID of the expression
 * @property {String} label Label of the expression
 * @property {String} created_at Date of creation
 */

/**
 * @typedef {Object} Created
 * @property {Number} id ID of created expression
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
   * Create a new expression
   * @param {String} label Label of the expression
   * @returns {Created} ID the new expression
   */
  create: async label => {
    const query = {
      name: `create-expression-${label}`,
      text: 'INSERT INTO "expression"("label") VALUES($1) RETURNING "id"',
      values: [label]
    };
    return await client.query(query);
  },

  /**
   * Update one expression by ID
   * @param {Number} id ID of the expression
   * @param {String} label New label of the expression
   * @returns {Updated} True if updated successfully
   */
  updateOne: async (id, label) => {
    const query = {
      name: `update-expression-${id}`,
      text: 'UPDATE "expression" SET "label" = $1 WHERE "id" = $2 RETURNING TRUE AS "updated"',
      values: [label, id]
    };
    return await client.query(query);
  },

  /**
   * Find all expressions
   * @returns {Expression[]} Available expressions
   */
  findAll: async (filter = {}) => {
    const query = {
      // name: "read-expressions",
      text: 'SELECT * FROM "get_expressions"($1)',
      values: [filter]
    };
    const result = await client.query(query);
    return result.rows;
  },

  /**
   * Find one expression by ID
   * @param {Number} id ID of the expression
   * @returns {Expression} Queried expression
   */
  findOneById: async id => {
    const query = {
      name: `read-expression-${id}`,
      text: 'SELECT * FROM "expression" WHERE "id" = $1',
      values: [id]
    };
    return await client.query(query);
  },

  /**
   * Delete one expression by ID
   * @param {Number} id ID of the expression
   * @returns {Deleted} True if success
   */
  deleteOne: async id => {
    const query = {
      name: `delete-expression-${id}`,
      text: 'SELECT delete_row_from_relation($1, $2) AS "deleted"',
      values: ["expression", id]
    };
    return await client.query(query);
  }
};
