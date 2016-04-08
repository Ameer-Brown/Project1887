var express = require('express');
var app = express();

//Routes
app.get('/', function sanity(req, res){
  console.log('server is working');
  res.sendFile(__dirname + '/views/home.html');
});




app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
