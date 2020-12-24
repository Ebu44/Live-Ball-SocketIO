const io = require("socket.io")();
const socketApi = {};
socketApi.io = io;

const users = {};

//helpers
const randomColor = require("../helpers/randomColor");

io.on("connection", (socket) => {
  socket.on("newUser", (data) => {
    const defaultData = {
      id: socket.id,
      position: {
        x: 0,
        y: 0,
      },
      color: randomColor(),
    };
    const userData = Object.assign(data, defaultData);
    users[socket.id] = userData;
    console.log(userData);
    socket.broadcast.emit("newUser", users[socket.id]);
    socket.emit("initPlayers", users);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("disUser", users[socket.id]);
    delete users[socket.id];
    console.log(users);
  });
  socket.on("animate", (data) => {
    users[socket.id].position.x = data.x;
    users[socket.id].position.y = data.y;

    socket.broadcast.emit("animate", {
      socketId: socket.id,
      x: data.x,
      y: data.y,
    });
  });
});

module.exports = socketApi;
