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
