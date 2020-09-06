const client = require("./");

const dataMapper = {
  insertOne: async message => {
    const { text, sender_id, recipient_id } = message;
    const query = {
      text:
        'INSERT INTO "message" ("text", "sender_id", "recipient_id") VALUES ($1, $2, $3) RETURNING "id"',
      values: [text, sender_id, recipient_id]
    };
    const result = await client.query(query);
    return result.rows[0];
  },

  setRead: async messageId => {
    const query = {
      text: 'UPDATE "message" SET "read" = TRUE WHERE "id" = $1',
      values: [messageId]
    };

    const result = await client.query(query);
    return result.rowCount;
  }
};

module.exports = dataMapper;
