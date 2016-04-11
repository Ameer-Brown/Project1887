$(document).ready(function() {
    console.log('home.js loaded!');

  $('#sbi').on("click", function(e){
    $.get('/api/college/:collegeID').success(function (college) {
        renderCollege(college);
      });
    });



  $.ajax({
    method:"GET",
    url: "api/colleges",
    success: onSuccess
  });



  function renderCollege(colleges) {
    console.log("colleges inside the render: ",colleges);
    // Target the html of the template
     var collegeHtml = $('#college-template').html();
     //compile the aluni html into the handlebars template
     var collegeTemplate= Handlebars.compile(collegeHtml);

     //prepend our compiled handlebars 'college html' after entering the college handlebars template
     var html = collegeTemplate({colleges:colleges});
     console.log(html);
     $('#college').append(html);
  }

   function onSuccess(colleges){
    console.log(colleges);
    //  college.forEach(function(college){
       renderCollege(colleges);
   // });
   }

});
