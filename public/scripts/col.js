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

// when the add song button is clicked, display the modal
function handleAddAlumniClick(e) {
  console.log('add-alumni clicked!');
  var currentAlumniId = $(this).closest('.alumni').data('alumni-id'); // "5665ff1678209c64e51b4e7b"
  console.log('id',currentAlumniId);
  $('#alumniModal').data('alumni-id', currentAlumniId);
  $('#alumniModal').modal();  // display the modal!
}

// when the song modal submit button is clicked:
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
  // note the server expects the keys to be 'name', 'trackNumber' so we use those.
  var dataToPost = {
    name: $alumName.val(),
    email: $alumEmail.val(),
    year: $alumYear.val(),
  };
  var alumniId = $modal.data('alumniId');
  console.log( name, email, year, major, job, message, alumniId);
  // POST to SERVER
  var songPostToServerUrl = '/api/albums/'+ albumId + '/songs';
  $.post(songPostToServerUrl, dataToPost, function(data) {
    console.log('received data from post to /songs:', data);
    // clear form
    $alumName.val('');
    $alumEmail.val('');

    // close modal
    $modal.modal('hide');
    // update the correct album to show the new song
    $.get('/api/albums/' + albumId, function(data) {
      // remove the current instance of the album from the page
      $('[data-album-id=' + albumId + ']').remove();
      // re-render it with the new album data (including songs)
      renderAlbum(data);
    });
  }).error(function(err) {
    console.log('post to /api/albums/:albumId/songs resulted in error', err);
  });
}
