const io = require("socket.io")();

const socketApi = {};
socketApi.io = io;

io.on("connection", (socket) => {
  console.log("a user connected");
});

module.exports = socketApi;
