var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Project1887_test");

var Album = require('./college');

module.exports.College = College;
module.exports.Alumni = require('./alumni');
