var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title: String,
  author: String,
  category: String
});





module.exports = mongoose.model('blog', blogSchema);
