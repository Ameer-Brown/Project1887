$(document).ready(function() {
  console.log('col.js loaded!');

     $('#college-form form').submit(function(e){
      e.preventDefault();
      // var name = $('#name').val();
      // var email = $('#email').val();
      // var year = $('#year').val();
      // var major = $('#major').val();
      // var job = $('#job').val();
      // var message= $('#message').val();
       $.ajax({
           method: 'POST',
           url: $('#selectCollege').val(),
           data: $(this).serialize(),
          //  {
          //    name: name,
          //    email: email,
          //    year: year,
          //    major: major,
          //    job: job,
          //    message: message
          //  },
           success: newAlumniSuccess,
         });
     });
});
