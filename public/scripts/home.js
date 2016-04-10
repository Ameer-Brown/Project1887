$(document).ready(function() {
  console.log('home.js loaded!');
$('#business').on("clcik", function(e){
  $.get('/api/alumni').success(function (alumni) {
    albums.forEach(function(album) {
      renderAlumni(alumni);
    });
  });

  $.ajax({
             method: 'GET',
             url: '/api/college/:name/alumni',
             success: newAlumniSuccess,
           });
      });
});

function renderAlumni(alumni) {
  // Target the html of the template
   var alumniHtml = $('#alumni-template').html();
   //compile the aluni html into the handlebars template
   var alumniTemplate= Handlebars.compile(alumniHtml);
   //prepend our compiled handlebars 'alumni html' after entering the alumni handlebars template
   var html=alumniTemplate({alumni: alumni });
   $('#alumni').append(html);
     }

 function onSuccess(alumni){
   alumni.forEach(function(alumni){
     renderAlumni(alumni);
 });
 }

 function newAlumniSuccess(json) {
   console.log(json);
   renderAlumni(json);
   }
