var db = require('./models');

var collegeOf =[];

collegeOf.push({
              name: 'School of Business and Industry',
              image: 'http://postimg.org/image/4wteeg31d/'
            });

collegeOf.push({
              name: 'School of Journalism and Graphic Communication',
              image:'http://postimg.org/image/g8wt4qwyp/'
            });

collegeOf.push({
              name: 'College of Pharmacy and Pharmaceutical Sciences',
              image:'http://postimg.org/image/sz11hu4wx/'
            });

collegeOf.push({
              name: 'College of Engineering (FAMU-FSU)',
              image:'http://postimg.org/image/mcedonn8h/'
            });

collegeOf.push({
              name: 'College of Law',
              image:'http://postimg.org/image/wdj7xz0bl/'
            });

collegeOf.push({
              name: 'School of Allied Health Sciences',
              image:'http://postimg.org/image/absxnxftt/'
            });

collegeOf.push({
              name: 'College of Education',
              image:'http://postimg.org/image/61iv6304h/'
            });

collegeOf.push({
              name: 'School of Nursing',
              image:'http://postimg.org/image/ripizp201/'
            });

collegeOf.push({
              name: 'School of the Environment',
              image:'http://postimg.org/image/c4vuc910h/'
            });

collegeOf.push({
              name: 'School of Architecture and Engineering Technology',
              image:'http://postimg.org/image/mcedonn8h/'
            });

collegeOf.push({
              name: 'College of Science and Technology',
              image:'http://postimg.org/image/72eihgrq9/'
            });

collegeOf.push({
              name: 'College of Social Sciences, Arts and Humanities',
              image:'http://postimg.org/image/55hscw129/'
            });

collegeOf.push({
              name: 'School of Graduate Studies and Research',
              image:'http://postimg.org/image/oytw5leg1/'
            });

collegeOf.push({
              name: 'College of Agriculture and Food Sciences',
              image:'http://postimg.org/image/5970feh5t/'
            });




var seedAlumni = [];

// seedAlumni.push({
//                alum: 'Ameer Brown',
//                email: 'akeithbrown@gmail.com',
//                year: 2014,
//                major: 'Public Relations',
//                job: 'Web Developer',
//                message:'Reach for the stars!'
//              });



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
