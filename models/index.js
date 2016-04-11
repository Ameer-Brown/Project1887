var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Project1887");

var College = require('./college');

module.exports.College = College;
module.exports.Alumni = require('./alumni');
