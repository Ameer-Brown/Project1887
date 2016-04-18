var template;

$(document).ready(function() {
  console.log('col.js loaded!');
  var idd = '/api'+document.location.pathname;
  $.ajax({
     method: 'GET',
     url: idd,
     success: onSuccess,
  });
  //Click Triggers
  $('#college').on('click', '.add-alumni', handleAddAlumniClick);
  $('#saveAlumni').on('click', handleNewAlumniSubmit);
  $('#college').on('click', '.edit-alumni', handleEditAlumniClick);
  $('#editAlumniModalBody').on('click', 'button.btn-danger', handleDeleteAlumniClick);
  $('#editAlumniModal').on('click', 'button#editAlumniModalSubmit', handleUpdateAlumniSave);
  var  source = $('#college-template').html();
  template = Handlebars.compile(source);
});
//Get College ID via pathname split pop. Change when Heroku Deploy
var idd = '/api'+document.location.pathname;
var  collegeId = idd.split("s/").pop();


 //CREATE
function handleNewAlumniSubmit(e) {
  e.preventDefault();
  var $modal = $('#alumniModal');
  var $alumName = $modal.find('#alum');
  var $alumEmail = $modal.find('#email');
  var $alumYear = $modal.find('#year');
  var $alumMajor = $modal.find('#major');
  var $alumJob = $modal.find('#job');
  var $alumMessage = $modal.find('#message');
  var dataToPost = {
    alum: $alumName.val(),
    email: $alumEmail.val(),
    year: $alumYear.val(),
    major: $alumMajor.val(),
    job: $alumJob.val(),
    message: $alumMessage.val(),
  };

  var alumniPostToServerUrl = '/api/colleges/'+ collegeId+'/alumni';
  $.post(alumniPostToServerUrl, dataToPost, function(data) {
    console.log('received data from post to /alumni:', data);
    $alumName.val('');
    $alumEmail.val('');
    $alumYear.val('');
    $alumMajor.val('');
    $alumJob.val('');
    $alumMessage.val('');
    $modal.modal('hide');

    $.get('/api'+document.location.pathname, function(data) {
      $('[data-college-id=' + collegeId + ']').remove();
      renderCollege(data);
    });
  }).error(function(err) {
    console.log('post to /api/colleges/:collegeId/alumni resulted in error', err);
  });
}

//UPDATE
function handleUpdateAlumniSave(event) {
  var $modal = $('#editAlumniModal');
  if($modal.find('form').length < 1) {
    $modal.modal('hide');
    return;
  }

  var collegeId = $modal.find('form').data('college-id');
  console.log(collegeId);
  var updatedAlumni = [];
  $modal.find('form').each(function () {

    var uAlumni = {};
    uAlumni._id = $(this).attr('id');
    uAlumni.alum = $(this).find('input.alumni-name').val();
    uAlumni.email = $(this).find('input.alumni-email').val();
    uAlumni.year = $(this).find('input.alumni-year').val();
    uAlumni.major = $(this).find('input.alumni-major').val();
    uAlumni.job = $(this).find('input.alumni-job').val();
    uAlumni.message = $(this).find('input.alumni-message').val();
    console.log('found updated data for alumni: ', uAlumni);
    updatedAlumni.push(uAlumni);
  });
  updateMultipleAlumni(collegeId, updatedAlumni);
  $modal.modal('hide');
}

function updateMultipleAlumni(collegeId, alumni) {
  var url = '/api/colleges/' + collegeId + '/alumni/';
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
    console.log('Going to fetch render', collegeId);
    fetchAndReRenderCollegeWithId(collegeId);
  });
}

function fetchAndReRenderCollegeWithId(collegeId) {
  $.get('/api/colleges/' + collegeId, function(data) {
    $('div[data-college-id=' + collegeId + ']').remove();
    renderCollege(data);
  });
}

function handleEditAlumniClick(e) {
  console.log('edit clicked for ', collegeId);
  var alumniGetFromServerUrl = '/api'+document.location.pathname +'/alumni';
  $.get(alumniGetFromServerUrl, function(alumni) {
    console.log('got my alumni: ', alumni);
    populateEditAlumniModal(alumni, collegeId);
    $('#editAlumniModal').modal();
  });
}

function populateEditAlumniModal(alumni, collegeId) {
  console.log("modal populated with", collegeId);
  var templateHtml = $('#alumni-edit-template').html();
  templateTwo = Handlebars.compile(templateHtml);
  alumniForms = templateTwo({alumni: alumni, collegeId: collegeId});
  $('#editAlumniModalBody').html(alumniForms);
}


function renderCollege(college) {
  console.log("college inside the render: ",college);
  var collegeHtml= template(college);
    $('#college').prepend(collegeHtml);
}

function onSuccess(json){
  console.log("SUCCESS", json);
  renderCollege(json);
}


  function handleAddAlumniClick(e) {
  console.log('add-alumni clicked!');
  console.log(collegeId);
  $('#alumniModal').data('college-id', collegeId);
  $('#alumniModal').modal();
}

//DELETE
function handleDeleteAlumniClick(e) {
  e.preventDefault();
  var $thisButton = $(this);
  var alumniId = $thisButton.data('alumni-id');
  console.log(alumniId);
  var collegeId = $thisButton.closest('form').data('college-id');
  console.log(collegeId);
  var url = '/api/colleges/' + collegeId + '/alumni/' + alumniId;
  $.ajax({
    method: 'DELETE',
    url: url,
    success: handleAlumniDeleteResponse
  });
}

function handleAlumniDeleteResponse(data) {
  var alumniId = data._id;
  var $formRow = $('form#' + alumniId);
  var collegeId = $formRow.data('college-id');
  $formRow.remove();
  fetchAndReRenderCollegeWithId(collegeId);
}
