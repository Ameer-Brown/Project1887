/************
 * DATABASE *
 ************/

var db = require('../models');

function get (req, res) {
  db.College.find( function(err, colleges) {
    if(err) { console.log('colleges error', err); }
    console.log('colleges responding with', colleges);
    res.json(colleges);
  });
}


// GET /api/colleges/:collegeId
function show (req, res) {
  db.College.findById(req.params.collegeId, function(err, foundCollege) {
    if(err) { console.log('collegesController.show error', err); }
    console.log('collegesController.show responding with', foundCollege);
    res.json(foundCollege);
  });
}



// export public methods here
module.exports = {
  // create: create,
     show: show,
     get: get,
  // destroy: destroy,
  // update: update
};
