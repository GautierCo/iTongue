const app = require("../app");
const socketIO = require("socket.io");

const handleSocket = require("../app/socket");

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const io = socketIO(server);
handleSocket(io);
