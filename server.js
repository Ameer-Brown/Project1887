var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + './controllers'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/vendor', express.static(__dirname + '/bower_components'));

var controllers = require('./controllers');
app.get('/api', controllers.api.index);

//Routes
app.get('/', function sanity(req, res){
  console.log('server is working');
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/colleges/:collegeId', function(req, res){
  res.sendFile(__dirname + '/views/col.html');
});


// JSON API ENDPOINTS

app.get('/api/colleges', controllers.colleges.index);
app.get('/api/colleges/:collegeId', controllers.colleges.show);

app.post('/api/colleges/:collegeId/alumni', controllers.alumni.create);


//Server
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
