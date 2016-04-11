$(document).ready(function() {
  console.log('home.js loaded!');

$('#sbi').on("click", function(e){
  $.get('/api/college/570b206ab9c1b0f933fddfa0').success(function (college) {
      renderCollege(college);
    });
  });
      });





function renderCollege(college) {
  // Target the html of the template
   var collegeHtml = $('#college-template').html();
   //compile the aluni html into the handlebars template
   var collegeTemplate= Handlebars.compile(collegeHtml);
   //prepend our compiled handlebars 'alumni html' after entering the alumni handlebars template
   var html=collegeTemplate({colleges: college });
   $('#college').append(html);
     }

 function onSuccess(college){
  //  college.forEach(function(college){
     renderCollege(college);
 // });
 }
