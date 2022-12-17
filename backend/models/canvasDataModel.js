const mongoose = require('mongoose')
const { Schema } = mongoose;


const canvasDataSchema = new mongoose.Schema({
  elements: {},
  previewUrl: {}
})


const CanvasData = mongoose.model('CanvasData', canvasDataSchema)


module.exports.CanvasData = CanvasData;