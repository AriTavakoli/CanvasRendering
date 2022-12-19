const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const connectDB = require('../config/db.js')

const model = require('../models/canvasDataModel.js')
const canvasController = require('../controllers/canvasDataController.js')
// const io = require('socket.io')(server);
const models = require( '@models/canvasDataModel.js');




// app.use(require("webpack-hot-middleware")(compiler,{
//   reload : true,
//   overlay: false,
//   hot: true,


// }));
connectDB();



app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend/client/dist')));




app.get('/save', (req, res) => {


})

// do these functions become async

app.post('/save', (req, res) => {



  res.status(200);
  console.log(req.body.pixelData, 'reqbody')


  canvasController.saveData(req.body.pixelData.title, req.body.pixelData.body)

})

app.get('/canvasData', async (req, res) => {

  // make api call to get all data from db
  // send data to frontend


  let canvasData = await canvasController.getAllData()
    .then((data) => { res.json(data) })
    .catch((err) => {
      throw new Error(err);
    })
})
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

