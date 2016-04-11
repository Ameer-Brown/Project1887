/************
 * DATABASE *
 ************/

var db = require('../models');

// GET /api/colleges (all colleges)
function index (req, res) {
  db.College.find( function(err, json) {
    if(err) { console.log('colleges error', err); }
    console.log('colleges responding with', json);
    res.json(json);
  });
}


// GET /api/colleges/:collegeId (one specific college)
function show (req, res) {
  db.College.findById(req.params.collegeId, function(err, json) {
    if(err) { console.log('collegesController.show error', err); }
    console.log('collegesController.show responding with', json);
    res.json(json);
  });
}



// export public methods here
module.exports = {
  // create: create,
     show: show,
     index: index,
  // destroy: destroy,
  // update: update
};
