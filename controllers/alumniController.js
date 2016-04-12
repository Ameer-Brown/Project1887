// alumniController
var db = require('../models');

// app.get('/api/colleges/:collegeId/alumni', controllers.alumni.index);
function index(req, res) {
  db.Alumni.findById(req.params.collegeId, function(err, foundAlumni) {
    console.log('responding with alumni:', foundAlumni); 
    res.json(foundAlumni.alumni);
  });
}

// POST '/api/colleges/:collegeId/alumni'
function create(req, res) {
  db.College.findById(req.params.collegeId, function(err, foundCollege) {
    console.log(req.body);
    var newAlumni = new db.Alumni(req.body);
    foundCollege.alumni.push(newAlumni);
    foundCollege.save(function(err, savedAlumni) {
      console.log('newAlumni created: ', newAlumni);
      res.json(newAlumni);
    });
  });
}


module.exports = {
  create: create,
  index: index
};
