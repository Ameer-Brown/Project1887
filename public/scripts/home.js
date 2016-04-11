$(document).ready(function() {
  console.log('home.js loaded!');

$('#sbi').on("submit", function(e){
  $.get('/api/college').onSuccess(function (college) {
      renderCollege(college);
    });
  });

  $.ajax({
             method: 'GET',
             url: '/api/college/name',
             success: onSuccess,
           });
      });
});

function renderCollege(college) {
  // Target the html of the template
   var collegeHtml = $('#college-template').html();
   //compile the aluni html into the handlebars template
   var collegeTemplate= Handlebars.compile(collegeHtml);
   //prepend our compiled handlebars 'alumni html' after entering the alumni handlebars template
   var html=collegeTemplate({college: college });
   $('#college').append(html);
     }

 function onSuccess(college){
  //  college.forEach(function(college){
     renderCollege(college);
 // });
 }
