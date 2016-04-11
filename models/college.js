var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Alumni = require('./alumni.js');

var collegeSchema = new Schema({
  name: String,
  // image: Image,
  alumni: [Alumni.schema],
});

var College= mongoose.model('College', collegeSchema);
module.exports = College;
