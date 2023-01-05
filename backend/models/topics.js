const mongoose = require('mongoose');



const topicSchema = new mongoose.Schema({
  topic: String,
})



module.exports = mongoose.model('Topics', topicSchema);