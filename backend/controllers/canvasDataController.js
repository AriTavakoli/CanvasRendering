const canvasModel = require('../models/canvasDataModel.js')


const saveData = async (title, data, callback) => {

  canvasModel.CanvasData.create({ title: title, body: data })


}



module.exports.saveData = saveData;
