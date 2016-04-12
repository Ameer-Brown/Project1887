var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var alumniSchema = new Schema({
  alum: String,
  email: String,
  year: Number,
  major: String,
  job: String,
  message: String
});

var Alumni= mongoose.model('Alumni', alumniSchema);
module.exports = Alumni;
