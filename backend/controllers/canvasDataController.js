const canvasModel = require('../models/canvasDataModel.js')

module.exports = {
  saveData: async (title, data, callback) => {
    canvasModel.CanvasData.create({ title: title, body: data })
  },

  getAllData: async () => {
    try {
      const canvasData = canvasModel.CanvasData.find({ title: "ariDoc" }).exec();
      return canvasData;

    } catch (err) {
      console.log(err.message);
    }

  }

}
