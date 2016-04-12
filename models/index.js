var mongoose = require("mongoose");
mongoose.connect( process.env.MONGOLAB_URI ||
                      process.env.MONGOHQ_URL ||
                            "mongodb://localhost/Project1887" );

var College = require('./college');

module.exports.College = College;
module.exports.Alumni = require('./alumni');
