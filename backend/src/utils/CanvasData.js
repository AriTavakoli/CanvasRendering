const mongoose = require('mongoose')
const { Schema } = mongoose;


const canvasDataSchema = new mongoose.Schema({
  title: String,
  body: String,


})
const CanvasData = mongoose.model('CanvasData', canvasDataSchema)


const saveData = async (title, data, callback) => {

  CanvasData.create({ title: title, body: data }, function (err, result) {
    if (err) {
      console.log(err, 'error');
      throw new Error(err);
      return false;
    } else {
      console.log(result);
      return result;
    }
  }).then(data => {
    console.log('data created ')
    return 'success'
  })


}

module.exports.saveData = saveData;
