const client = require("./");

const dataMapper = {
  getAllByRecordId: async recordId => {
    const query = {
      name: `read-record-comments-${recordId}`,
      text: 'SELECT * FROM "comments_with_user" WHERE "recordId" = $1',
      values: [recordId]
    };
    const result = await client.query(query);
    return result.rows;
  },

  getOneById: async commentId => {
    const query = {
      text: 'SELECT * FROM "record_comment" WHERE "id" = $1',
      values: [commentId]
    };
    const result = await client.query(query);
    return result.rows[0];
  },

  insertOne: async (userId, recordId, comment) => {
    const query = {
      text:
        'INSERT INTO "record_comment" ("user_id", "record_id", "text") values($1, $2, $3) RETURNING "id"',
      values: [userId, recordId, comment]
    };
    const result = await client.query(query);
    return result.rows[0];
  },

  updateOne: async (commentId, comment) => {
    const query = {
      text: 'UPDATE "record_comment" SET "text" = $2 WHERE "id" = $1',
      values: [commentId, comment]
    };
    const result = await client.query(query);
    return result.rowCount;
  },

  deleteOne: async commentId => {
    const query = {
      text: 'DELETE FROM "record_comment" WHERE "id" = $1',
      values: [commentId]
    };
    const result = await client.query(query);
    return result.rowCount;
  }
};

module.exports = dataMapper;
