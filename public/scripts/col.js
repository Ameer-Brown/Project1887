$(document).ready(function() {
  console.log('col.js loaded!');

     $('#college-form form').submit(function(e){
      e.preventDefault();
       $.ajax({
           method: 'POST',
           url: $('#selectCollege').val(),
           data: $(this).serialize(),
           success: newAlumniSuccess,
         });
     });
});
