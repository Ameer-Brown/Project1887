var db = require('./models');

var collegeOf =[];

collegeOf.push({
              name: 'School of Business and Industry'
            });

collegeOf.push({
              name: 'School of Journalism and Graphic Communication'
            });

collegeOf.push({
              name: 'College of Pharmacy and Pharmaceutical Sciences'
            });

collegeOf.push({
              name: 'College of Engineering (FAMU-FSU)'
            });

collegeOf.push({
              name: 'College of Law'
            });

collegeOf.push({
              name: 'School of Allied Health Sciences'
            });

collegeOf.push({
              name: 'College of Education'
            });

collegeOf.push({
              name: 'School of Nursing'
            });

collegeOf.push({
              name: 'School of the Environment'
            });

collegeOf.push({
              name: 'School of Architecture and Engineering Technology'
            });

collegeOf.push({
              name: 'College of Science and Technology'
            });

collegeOf.push({
              name: 'College of Social Sciences, Arts and Humanities'
            });

collegeOf.push({
              name: 'School of Graduate Studies and Research'
            });

collegeOf.push({
              name: 'College of Agriculture and Food Sciences'
            });




var seedAlumni = [];

seedAlumni.push({
               alum: 'Ameer Brown',
               email: 'akeithbrown@gmail.com',
               year: 2014,
               major: 'Public Relations',
               job: 'Web Developer',
               message:'Reach for the stars!'
             });



// populate each colleges list
collegeOf.forEach(function(college) {
  college.alumni = seedAlumni;
});


db.College.remove({}, function(err, colleges){

  db.College.create(collegeOf, function(err, colleges){
    if (err) { return console.log('ERROR', err); }
    console.log("all colleges:", colleges);
    console.log( "created", colleges.length, "colleges");
    process.exit();
  });

});
