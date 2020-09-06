const client = require("./");

const dataMapper = {
  insertOne: async record => {
    const query = {
      text: `INSERT INTO "record" ("url", "user_id", "translation_id")
                  VALUES ($1, $2, $3)
               RETURNING "id"`,
      values: [record.url, record.userId, record.translationId]
    };

    const result = await client.query(query);
    return result.rows[0];
  },

  findOne: async (filter = {}) => {
    const query = {
      text: 'SELECT * FROM "get_records"($1) LIMIT 1',
      values: [filter]
    };

    const result = await client.query(query);
    return result.rows[0];
  },

  showOne: async (filter = {}) => {
    const query = {
      text: 'SELECT * FROM "show_records"($1) LIMIT 1',
      values: [filter]
    };

    const result = await client.query(query);
    return result.rows[0];
  },

  findByPk: id => dataMapper.findOne({ id: { operator: "=", value: id } }),

  showByPk: id => dataMapper.showOne({ id: { table: "r", operator: "=", value: id } }),

  findAll: async (filter = {}) => {
    const query = {
      text: 'SELECT * FROM "show_records"($1)',
      values: [filter]
    };
    const result = await client.query(query);
    return result.rows;
  },

  deleteOne: async recordId => {
    const result = await client.query('DELETE FROM "record" WHERE "id" = $1', [recordId]);
    return result.rowCount;
  },

  addLike: async (userId, recordId) => {
    const query = {
      text: 'INSERT INTO "record_user_like" ("user_id", "record_id") VALUES ($1, $2)',
      values: [userId, recordId]
    };
    const result = await client.query(query);
    return result.rowCount;
  },

  removeLike: async (userId, recordId) => {
    const query = {
      text: 'DELETE FROM "record_user_like" WHERE "user_id" = $1 AND "record_id" = $2',
      values: [userId, recordId]
    };
    const result = await client.query(query);
    return result.rowCount;
  },

  getLikes: async recordId => {
    const query = {
      text: 'SELECT * FROM "get_record_likes"($1)',
      values: [recordId]
    };
    const result = await client.query(query);
    return result.rows;
  },

  addBookmark: async (userId, recordId) => {
    const query = {
      text: 'INSERT INTO "record_user_bookmark" ("user_id", "record_id") VALUES ($1, $2)',
      values: [userId, recordId]
    };
    const result = await client.query(query);
    return result.rowCount;
  },

  removeBookmark: async (userId, recordId) => {
    const query = {
      text: 'DELETE FROM "record_user_bookmark" WHERE "user_id" = $1 AND "record_id" = $2',
      values: [userId, recordId]
    };
    const result = await client.query(query);
    return result.rowCount;
  },

  getBookmarks: async recordId => {
    const query = {
      text: 'SELECT * FROM "get_record_bookmarks"($1)',
      values: [recordId]
    };
    const result = await client.query(query);
    return result.rows;
  }
};

module.exports = dataMapper;
