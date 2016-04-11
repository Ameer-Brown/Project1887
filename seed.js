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

              {
              name: '',
              },

              {
              name: '  College of Law',
              },

              {
              name: 'School of Allied Health Sciences',
              },

              {
              name: 'College of Education',
              },

              {
              name: 'School of Nursing',
              },

              {
              name: 'School of the Environment',
              },

              {
              name: 'School of Architecture and Engineering Technology',
              },

              {
              name: 'College of Science and Technology',
              },

              {
              name: 'College of Social Sciences, Arts and Humanities',
              },

              {
              name: 'School of Graduate Studies and Research',
              },

              {
              name: 'College of Agriculture and Food Sciences',
              },
              ];



var seedAlumni = [];

seedAlumni.push({ alum: '',
                   : 1
});


// populate each albums song list
albumList.forEach(function(album) {
  album.songs = sampleSongs;
});


db.Album.remove({}, function(err, albums){

  db.Album.create(albumList, function(err, albums){
    if (err) { return console.log('ERROR', err); }
    console.log("all albums:", albums);
    console.log("created", albums.length, "albums");
    process.exit();
  });

});
