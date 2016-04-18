var db = require('../models');

function index(req, res) {
  db.College.findById(req.params.collegeId, function(err, foundCollege) {
    res.json(foundCollege.alumni);
  });
}

function create(req, res) {
  db.College.findById(req.params.collegeId, function(err, foundCollege) {
    var newAlumni = new db.Alumni(req.body);
    foundCollege.alumni.push(newAlumni);
    foundCollege.save(function(err, savedAlumni) {
      res.json(newAlumni);
    });
  });
}

function destroy(req, res) {
  db.College.findById(req.params.collegeId, function(err, foundCollege) {
    var correctAlumni = foundCollege.alumni.id(req.params.alumniId);
    if (correctAlumni) {
      correctAlumni.remove();
      foundCollege.save(function(err, saved) {
        res.json(correctAlumni);
      });
    } else {
      res.send(404);
    }
  });
}

function update(req, res) {
  db.College.findById(req.params.collegeId, function(err, foundCollege) {
    var correctAlumni = foundCollege.alumni.id(req.params.alumniId);
    if (correctAlumni) {
      correctAlumni.id = req.body.id;
      correctAlumni.alum = req.body.alum;
      correctAlumni.email = req.body.email;
      correctAlumni.year = req.body.year;
      correctAlumni.major = req.body.major;
      correctAlumni.job = req.body.job;
      correctAlumni.message = req.body.message;
      foundCollege.save(function(err, saved) {
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
  update: update,
  destroy: destroy
};
