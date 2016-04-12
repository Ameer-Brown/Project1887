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



//app.put('/api/colleges/:collegeId/alumni/:alumniId', controllers.alumni.update);
function update(req, res) {
  db.College.findById(req.params.collegeId, function(err, foundCollege) {
    console.log(foundCollege);
    // we've got the album, now find the song within it
    var correctAlumni = foundCollege.alumni.id(req.params.alumniId);
    if (correctAlumni) {
      console.log(req.body);
      correctAlumni.id = req.body.id;
      correctAlumni.name = req.body.name;
      foundCollege.save(function(err, saved) {
        console.log('UPDATED', correctAlumni, 'IN ', saved.alumni);
        res.json(correctAlumni);
      });
    } else {
      res.send(404);
    }
  });

}

module.exports = {
  create: create,
  index: index,
  update: update
};
