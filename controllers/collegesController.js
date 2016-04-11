/************
 * DATABASE *
 ************/

var db = require('../models');



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
  // destroy: destroy,
  // update: update
};
