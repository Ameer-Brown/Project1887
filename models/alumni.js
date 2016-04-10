var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// TODO: set up your SongsSchema

var alumniSchema = new Schema({
  name: String,
  trackNumber: Number
});

var Song= mongoose.model('Song', songSchema);
module.exports = Song;
