const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
// const io = require('socket.io')(server);

var webpack = require('webpack');
var webpackConfig = require('../frontend/config/webpack.config');
var compiler = webpack(webpackConfig);




app.use(require("webpack-hot-middleware")(compiler,{
  reload : true,
  overlay: true,
  hot: true,




}));



app.use(express.static(path.join(__dirname, '../frontend/client/dist')));


console.log('sup')


// io.on('connect', (socket) => {
//   console.log('a user connected');


//   socket.on('draw', (data) => {
//     console.log('data', data);

//   });

//   socket.on('sd', (data) => {
//     console.log('sd', data);
//     socket.broadcast.emit('sd', data);
//   });

// });


server.listen(3000, () => {
  console.log('listening on *:3000');
});

