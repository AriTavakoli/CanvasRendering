const mongoose = require('mongoose')
const { Schema } = mongoose;


const canvasDataSchema = new mongoose.Schema({
  title: String,
  body: String,
})


const CanvasData = mongoose.model('CanvasData', canvasDataSchema)


module.exports.CanvasData = CanvasData;