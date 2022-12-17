const canvasModel = require('../models/canvasDataModel.js')



module.exports = {
  saveData: async (title, data, callback) => {
    canvasModel.CanvasData.create({ title: title, body: data })
  },

  getAllData: async () => {
    try {
      const canvasData = canvasModel.CanvasData.find({ title: "ariDoc" });
      canvasData.then((data) => {
        console.log(data)
        return data;
      })
    } catch (err) {
      console.log(err.message);
    }

  }

}
