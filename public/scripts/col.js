$(document).ready(function() {
  console.log('col.js loaded!');

  $.ajax({
     method: 'GET',
     url: "/api"+document.location.pathname,
     success: onSuccess,
  });

  $('#college').on('click', '.add-alumni', handleAddAlumniClick);
  $('#saveAlumni').on('click', handleNewAlumniSubmit);
  $('#college').on('click', '.delete-album', handleDeleteAlbumClick);
  $('#college').on('click', '.edit-alumni', handleAlbumEditClick);
  $('#college').on('click', '.save-album', handleSaveChangesClick);
  $('#college').on('click', '.edit-alumni', handleEditAlumniClick);
});
//Get College ID via pathname split pop. Change when Heroku Deploy
var idd = '/api'+document.location.pathname;
var  collegeId = idd.split("s/").pop();


function handleUpdateAlumniSave(event) {
  // build all the alumni objects up
  var $modal = $('#editAlumniModal');
  if($modal.find('form').length < 1) {
    // if there are no form elements, then there are no songs to update
    $modal.modal('hide');
    return;
  }
  // snag the albumId from the first form object on the modal
  var collegeId = $modal.find('form').data('college-id');

  var updatedAlumni = [];

  $modal.find('form').each(function () {
    // in here this is a form element
    var aAlumni = {};
    aAlumni._id = $(this).attr('id');
    aAlumni.alum = $(this).find('input.alumni-name').val();
    aAlumni.email = $(this).find('input.alumni-email').val();
    aAlumni.year = $(this).find('input.alumni-year').val();
    aAlumni.major = $(this).find('input.alumni-major').val();
    aAlumni.job = $(this).find('input.alumni-job').val();
    aAlumni.message = $(this).find('input.alumni-message').val();
    console.log('found updated data for alumni: ', aAlumni);
    updatedAlumni.push(aAlumni);
  });

  $modal.modal('hide');
  updateMultipleAlumni(albumId, updatedAlumni);
}

function updateMultipleAlumni(collegeId, alumni) {
  //   we'll re-render the entire college again.
  var url = '/api/colleges/' + albumId + '/alumni/';
  var deferreds = [];

  alumni.forEach(function(alumni) {
    var ajaxCall = $.ajax({
      method: 'PUT',
      url: url + alumni._id,
      data: alumni,
      error: function(err) { console.log('Error updating alumni ', alumni.alum, err); }
    });
    deferreds.push(ajaxCall);
  });

  $.when.apply(null, deferreds).always(function() {
    console.log('all updates sent and received, time to refresh!');
    console.log(arguments);
    fetchAndReRenderCollegeWithId(collegeId);
  });
}

function fetchAndReRenderCollegeWithId(collegeId) {
  $.get('/api/colleges/' + collegeId, function(data) {
    $('div[data-college-id=' + collegeId + ']').remove();
    renderCollege(data);
  });
}

// when a delete button in the edit alumni modal is clicked
function handleDeleteAlumniClick(e) {
  e.preventDefault();
  var $thisButton = $(this);
  var alumniId = $thisButton.data('alumni-id');
  var collegeId = $thisButton.closest('form').data('college-id');

  var url = '/api/colleges/' + collegeId + '/alumni/' + alumniId;
  console.log('send DELETE ', url);
  $.ajax({
    method: 'DELETE',
    url: url,
    success: handleAlumniDeleteResponse
  });
}

function handleAlumniDeleteResponse(data) {
  console.log('handleAlumniDeleteResponse got ', data);
  var alumniId = data._id;
  var $formRow = $('form#' + alumniId);
  var collegeId = $formRow.data('college-id');
  $formRow.remove();
  fetchAndReRenderCollegeWithId(collegeId);
}


// when edit songs button clicked
function handleEditAlumniClick(e) {
  var $collegeRow = $(this).closest('.college');
  var collegeId = $collegeRow.data('college-id');
  console.log('edit alumni clicked for ', collegeId);

  $.get('/api/colleges/' + collegeId + "/alumni", function(alumni) {
    console.log('got back alumni: ', alumni);
    populateEditAlumniModal(alumni, collegeId);
    $('#editAlumniModal').modal();
  });
}

function populateEditSongsModal(alumni, collegeId) {
  var templateHtml = $('#alumni-edit-template').html();
  var template = Handlebars.compile(templateHtml);
  alumniForms = template({collegeId: collegeId, alum: alum, email: email, year: year, major: major, job: job, message: message});
  $('#editAlumniModalBody').html(alumniForms);
}


function renderCollege(college) {
  console.log("college inside the render: ",college);
  var collegeHtml = $('#college-template').html();
  var collegeTemplate= Handlebars.compile(collegeHtml);
  console.log(html);
  $('#college').prepend(html);
}

function onSuccess(json){
  console.log(json);
  renderCollege(json);
}




// when the add alumni button is clicked, display the modal
  function handleAddAlumniClick(e) {
  console.log('add-alumni clicked!');
  // var currentCollegeId = $(this).closest('.college').data('college-id');
  console.log(collegeId);
  $('#alumniModal').data('college-id', collegeId);
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
    message: $alumMessage.val(),
  };

  console.log( name, email, year, major, job, message, collegeId);
  // POST to SERVER
  var alumniPostToServerUrl = '/api'+document.location.pathname +'/alumni';
  $.post(alumniPostToServerUrl, dataToPost, function(data) {
    console.log('received data from post to /alumni:', data);
    // clear form
    $alumName.val('');
    $alumEmail.val('');
    $alumYear.val('');
    $alumMajor.val('');
    $alumJob.val('');
    $alumMessage.val('');


    // close modal
    $modal.modal('hide');
    // update the correct college to show the new alumni
    $.get('/api'+document.location.pathname, function(data) {
      // remove the current instance of the college from the page
      $('[data-college-id=' + collegeId + ']').remove();
      // re-render it with the new college data (including alumni)
      renderCollege(data);
    });
  }).error(function(err) {
    console.log('post to /api/colleges/:collegeId/alumni resulted in error', err);
  });
}

// when edit songs button clicked
function handleEditAlumniClick(e) {
  console.log('edit songs clicked for ', collegeId);
  var alumniGetFromServerUrl = '/api'+document.location.pathname +'/alumni';
  $.get(alumniGetFromServerUrl, function(alumni) {
    console.log('got back alumni: ', alumni);
    populateEditAlumniModal(alumni, collegeId);
    // fire zee modal!
    $('#editAlumniModal').modal();
  });
}
