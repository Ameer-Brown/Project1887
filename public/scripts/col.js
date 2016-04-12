$(document).ready(function() {
  console.log('col.js loaded!');

  $.ajax({
     method: 'GET',
     url: "/api"+document.location.pathname,
     success: onSuccess,
  });
});


function renderCollege(college) {
  console.log("college inside the render: ",college);
  // Target the html of the template
  var collegeHtml = $('#college-template').html();
  //compile the aluni html into the handlebars template
  var collegeTemplate= Handlebars.compile(collegeHtml);

  //prepend our compiled handlebars 'college html' after entering the college handlebars template
  var html = collegeTemplate(college);
  console.log(html);
  $('#college').append(html);
}

function onSuccess(json){
  console.log(json);
  renderCollege(json);
}

// when the add alumni button is clicked, display the modal
function handleAddAlumniClick(e) {
  console.log('add-alumni clicked!');
  var currentAlumniId = $(this).closest('.alumni').data('alumni-id');
  console.log('id',currentAlumniId);
  $('#alumniModal').data('alumni-id', currentAlumniId);
  $('#alumniModal').modal();  // display the modal!
}

// when the alumni modal submit button is clicked:
function handleNewAlumniSubmit(e) {
  e.preventDefault();
  var $modal = $('#alumniModal');
  var $alumName = $modal.find('#alum');
  var $alumEmail = $modal.find('#email');
  var $alumYear = $modal.find('#year');
  var $alumMajor = $modal.find('#major');
  var $alumJob = $modal.find('#job');
  var $alumMessage = $modal.find('#message');

  // get data from modal fields
  var dataToPost = {
    alum: $alumName.val(),
    email: $alumEmail.val(),
    year: $alumYear.val(),
    major: $alumMajor.val(),
    job: $alumJob.val(),
    message: $alum.val(),
  };

  var alumniId = $modal.data('alumniId');
  console.log( name, email, year, major, job, message, alumniId);
  // POST to SERVER
  var alumniPostToServerUrl = '/api/colleges/'+ collegeId + '/alumni';
  $.post(alumniPostToServerUrl, dataToPost, function(data) {
    console.log('received data from post to /alumni:', data);
    // clear form
    $alumName.val('');
    $alumEmail.val('');
    $alumYear.val('');
    $alumMajor.val('');
    $alumJob.val('');
    $alum.val('');



    // close modal
    $modal.modal('hide');
    // update the correct college to show the new alumni
    $.get('/api/colleges/' + collegeId, function(data) {
      // remove the current instance of the college from the page
      $('[data-college-id=' + collegeId + ']').remove();
      // re-render it with the new college data (including alumni)
      renderCollege(data);
    });
  }).error(function(err) {
    console.log('post to /api/colleges/:collegeId/alumni resulted in error', err);
  });
}
