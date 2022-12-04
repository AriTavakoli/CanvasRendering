const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const io = require('socket.io')(server);


app.use(express.static(path.join(__dirname, '../client/dist')));





io.on('connect', (socket) => {
  console.log('a user connected');


  socket.on('draw', (data) => {
    console.log('darta', data);

  });

  socket.on('sd', (data) => {
    console.log('sd', data);
    socket.broadcast.emit('sd', data);
  });




});







server.listen(3000, () => {
  console.log('listening on *:3000');
});

