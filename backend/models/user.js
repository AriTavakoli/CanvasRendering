const mongoose = require('mongoose');





const userSchema = mongoose.Schema({
  name: String,
  age: Number,
  hobbies: [],

})


module.exports = mongoose.model('User', userSchema)