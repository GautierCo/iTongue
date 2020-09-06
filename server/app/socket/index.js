const jwt = require("jsonwebtoken");

const redis = require("../redis");
const authUtils = require("../utils/auth-utils");
const messageDatamapper = require("../db/message-datamapper");

module.exports = io => {
  io.use(async (socket, next) => {
    if (!socket.handshake.query || !socket.handshake.query.token)
      return next(new Error("L'access token est manquant"));

    const accessToken = socket.handshake.query.token;

    try {
      if (await authUtils.isBlacklistedToken(accessToken))
        return next(new Error("L'access token n'est plus valide"));

      jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return next(new Error("L'access token n'est plus valide"));

        socket.user = user;
        next();
      });
    } catch (err) {
      next(err);
    }
  });

  io.on("connect", async socket => {
    try {
      await storeSocket(socket.user.id, socket.id);
    } catch (err) {
      socket.emit("serverError", err);
      console.log(err);
    }

    socket.on(
      "message",
      async ({ authorFirstname, authorLastname, authorAvatarUrl, text, recipientId }) => {
        try {
          const dbMessage = await messageDatamapper.insertOne({
            text,
            sender_id: socket.user.id,
            recipient_id: recipientId
          });

          if (socket.user.id != recipientId) {
            const recipientSocketIds = await getSockets(recipientId);
            const userSocketIds = (await getSockets(socket.user.id)).filter(
              socketId => socketId != socket.id
            );

            for (const socketId of [...recipientSocketIds, ...userSocketIds]) {
              io.to(socketId).emit("message", {
                messageId: dbMessage.id,
                authorId: socket.user.id,
                authorFirstname,
                authorLastname,
                authorAvatarUrl,
                text
              });
            }
          } else {
            socket.emit(
              "serverError",
              new Error("Un utilisateur ne peut être à la fois expéditeur et destinataire")
            );
          }
        } catch (err) {
          socket.emit("serverError", err);
          console.log(err);
        }
      }
    );

    socket.on("read", messageId => {
      messageDatamapper.setRead(messageId).catch(err => {
        socket.emit("serverError", err);
        console.log(err);
      });
    });

    socket.on("typing", async ({ authorFirstname, authorLastname, recipientId }) => {
      if (socket.user.id != recipientId) {
        try {
          const recipientSocketIds = await getSockets(recipientId);
          const userSocketIds = (await getSockets(socket.user.id)).filter(
            socketId => socketId != socket.id
          );

          for (const socketId of [...recipientSocketIds, ...userSocketIds]) {
            io.to(socketId).emit("typing", {
              authorFirstname,
              authorLastname,
              authorId: socket.user.id
            });
          }
        } catch (err) {
          socket.emit("serverError", err);
          console.log(err);
        }
      }
    });

    socket.on("disconnect", () => {
      removeSocket(socket.user.id, socket.id).catch(err => {
        socket.emit("serverError", err);
        console.log(err);
      });
    });
  });
};

function getSockets(contactId) {
  return new Promise((resolve, reject) => {
    redis.client.smembers(redis.prefix + "active_socket:" + contactId, (err, socketIds) => {
      if (err) return reject(err);
      resolve(socketIds);
    });
  });
}

function storeSocket(userId, socketId) {
  return new Promise((resolve, reject) => {
    redis.client.sadd(redis.prefix + "active_socket:" + userId, socketId, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function removeSocket(userId, socketId) {
  return new Promise((resolve, reject) => {
    redis.client.srem(redis.prefix + "active_socket:" + userId, socketId, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
