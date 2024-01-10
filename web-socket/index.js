const http = require('http');
const path = require('path');
const express = require('express');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(express.static(path.resolve("./public")));
app.get('/', (req, res) => {
    res.sendFile("/public/index.html");
  });
  io.on('connection', (socket) => {    
    socket.on('user-message', (msg) => {
        console.log('message: ' + msg);
        io.emit("receive-message",msg);
      });
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    //   });
    socket.on('request', (arg1, arg2, callback) => {
      console.log(arg1); // { foo: 'bar' }
      console.log(arg2); // 'baz'
      callback({
        status: 'ok'
      });
    });
  });
  // io.on("connection", async (socket) => {
  //   const userId = await computeUserIdFromHeaders(socket);
  
  //   socket.join(userId);
  
  //   // and then later
  //   io.to(userId).emit("hi");
  // });
 
  
  const rooms = io.of("/room-test").adapter.rooms;
  const sids = io.of("/room-test").adapter.sids;
  console.log(rooms);
  console.log(sids);
  io.of("/room-test").adapter.on("create-room", (room) => {
    console.log(`room ${room} was created`);
  });
  
  io.of("/room-test").adapter.on("join-room", (room, id) => {
    console.log(`socket ${id} has joined room ${room}`);
  });
  server.listen(9000, () => {
    console.log('server running at http://localhost:9000');
  });