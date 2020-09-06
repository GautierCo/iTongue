const client = require("./");

// TODO Cache Redis

const dataMapper = {
  insertOne: async user => {
    const result = await client.query('SELECT insert_user($1) AS "id"', [user]);
    return result.rows[0];
  },

  findAll: async (filter = {}, withRelations = true) => {
    const funcName = withRelations ? "get_users_with_relations" : "get_users";
    const query = {
      text: `SELECT * FROM "${funcName}"($1)`,
      values: [filter]
    };
    const result = await client.query(query);
    return result.rows;
  },

  showAll: async (filter = {}) => {
    const query = {
      text: 'SELECT * FROM "show_users"($1)',
      values: [filter]
    };
    const result = await client.query(query);
    return result.rows;
  },

  findOne: async (filter = {}, withRelations = true) => {
    const funcName = withRelations ? "get_users_with_relations" : "get_users";
    const query = {
      text: `SELECT * FROM "${funcName}"($1) LIMIT 1`,
      values: [filter]
    };

    const result = await client.query(query);
    return result.rows[0];
  },

  findByPk: (id, withRelations = true) =>
    dataMapper.findOne({ id: { operator: "=", value: id } }, withRelations),

  showOne: async (filter = {}) => {
    const query = {
      text: `SELECT * FROM "show_users"($1) LIMIT 1`,
      values: [filter]
    };

    const result = await client.query(query);
    return result.rows[0];
  },

  update: async user => {
    const { id, ...updates } = user;
    const fields = Object.keys(updates);

    if (!fields.length) return 0;

    const update = fields.reduce((query, field, i) => {
      query += i > 0 ? "," : "";
      query += ` "${field}" = $${i + 1}`;
      return query;
    }, 'UPDATE "user" SET');

    const query = {
      text: update + ` WHERE "id" = $${fields.length + 1} RETURNING *`,
      values: [...Object.values(updates), id]
    };

    const result = await client.query(query);
    return result.rows[0];
  },

  deleteOne: async id => {
    const result = await client.query('DELETE FROM "user" WHERE "id" = $1', [id]);
    return result.rowCount;
  },

  findSlugs: async slug => {
    const result = await client.query('SELECT get_similar_slugs($1) AS "slug"', [slug]);
    return result.rows;
  },

  setAvatarUrl: async (url, id) => {
    const query = {
      text: 'UPDATE "user" SET "avatar_url" = $1 WHERE "id" = $2',
      values: [url, id]
    };
    const result = await client.query(query);
    return result.rowCount;
  },

  findLanguage: async userLanguage => {
    const query = {
      text:
        'SELECT * FROM "language_user" WHERE "user_id" = $1 AND "language_id" = $2 AND "role" = $3 LIMIT 1',
      values: [userLanguage.languageId, userLanguage.userId, userLanguage.role]
    };

    const result = await client.query(query);
    return result.rows[0];
  },

  addLanguage: async userLanguage => {
    const query = {
      text:
        'INSERT INTO "language_user" ("language_id", "user_id", "role") VALUES ($1, $2, $3) RETURNING "id"',
      values: [userLanguage.languageId, userLanguage.userId, userLanguage.role]
    };

    const result = await client.query(query);
    return result.rows[0];
  },

  syncLanguages: async languages => {
    if (!languages.length) return 0;

    const fields = Object.keys(languages[0]);
    const userId = languages[0].user_id;

    const values = [];
    const deleteQuery = 'DELETE FROM "language_user" WHERE "user_id" = $1';
    const insertQuery = languages.reduce((query, language, i) => {
      query += i === 0 ? " " : ", ";
      Object.values(language).forEach((value, j) => {
        query += j === 0 ? "(" : ", ";
        query += `$${i * fields.length + j + 1}`;
        if (j === fields.length - 1) {
          query += ")";
        }
        values.push(value);
      });
      return query;
    }, `INSERT INTO "language_user" ("${fields.join('", "')}") VALUES`);

    const transactionClient = await client.connect();
    try {
      await transactionClient.query("BEGIN");

      await transactionClient.query(deleteQuery, [userId]);
      const result = await transactionClient.query(insertQuery, values);

      await transactionClient.query("COMMIT");

      return result.rowCount;
    } catch (err) {
      await transactionClient.query("ROLLBACK");
      throw err;
    } finally {
      transactionClient.release();
    }
  },

  deleteLanguage: async userLanguage => {
    const query = {
      text:
        'DELETE FROM "language_user" WHERE "language_id" = $1 AND "user_id" = $2 AND "role" = $3',
      values: [userLanguage.languageId, userLanguage.userId, userLanguage.role]
    };
    const result = await client.query(query);
    return result.rowCount;
  },

  follow: async (followerId, followedId) => {
    const query = {
      text: 'INSERT INTO "user_user_follow"("follower_id", "followed_id") VALUES($1, $2)',
      values: [followerId, followedId]
    };

    const result = await client.query(query);
    return result.rowCount;
  },

  unfollow: async (followerId, followedId) => {
    const query = {
      text: 'DELETE FROM "user_user_follow" WHERE "follower_id" = $1 AND "followed_id" = $2',
      values: [followerId, followedId]
    };

    const result = await client.query(query);
    return result.rowCount;
  },

  getFollowers: async userId => {
    const query = {
      text: "SELECT * FROM get_user_subscriptions($1, $2, $3) AS followers",
      values: [userId, "follower_id", "followed_id"]
    };

    const result = await client.query(query);
    return result.rows;
  },

  getFollowed: async userId => {
    const query = {
      text: 'SELECT * FROM "get_user_subscriptions"($1, $2, $3) AS "followed"',
      values: [userId, "followed_id", "follower_id"]
    };

    const result = await client.query(query);
    return result.rows;
  },

  getFeed: async userId => {
    const query = {
      text: 'SELECT * FROM "get_feed"($1) AS "feed"',
      values: [userId]
    };

    const result = await client.query(query);
    return result.rows;
  },

  getLikes: async recordId => {
    const query = {
      text: 'SELECT * FROM "get_user_likes"($1)',
      values: [recordId]
    };
    const result = await client.query(query);
    return result.rows;
  },

  getBookmarks: async recordId => {
    const query = {
      text: 'SELECT * FROM "get_user_bookmarks"($1)',
      values: [recordId]
    };
    const result = await client.query(query);
    return result.rows;
  },

  getThreads: async userId => {
    const query = {
      text: 'SELECT * FROM "get_threads"($1)',
      values: [userId]
    };
    const result = await client.query(query);
    return result.rows;
  },

  getThread: async (userId, contactId) => {
    const query = {
      text: 'SELECT * FROM "get_thread"($1, $2)',
      values: [userId, contactId]
    };
    const result = await client.query(query);
    return result.rows[0];
  }
};

module.exports = dataMapper;
