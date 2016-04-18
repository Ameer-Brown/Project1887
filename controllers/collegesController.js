var db = require('../models');

function index (req, res) {
  db.College.find( function(err, json) {
    if(err) { console.log('colleges error', err); }
    res.json(json);
  });
}


function show (req, res) {
  db.College.findById(req.params.collegeId, function(err, json) {
    if(err) { console.log('collegesController.show error', err); }
    res.json(json);
  });
}


module.exports = {
     show: show,
     index: index,
};
