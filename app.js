var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

app.get('/', function(req, res) {
  res.render('index')
});

app.get('/searching', function(req, res){
  //input from search
  var val = req.query.search;
  //console.log(val + " is the value");
  //res.send("WHEEE This just tests the /searching route");
  var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20craigslist.search" +
  "%20where%20location%3D%22sfbay%22%20and%20type%3D%22jjj%22%20and%20query%3D%22" + val + "%22&format=" +
  "json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  
  //request module is used to process the yql url and return the results in JSON format
  request(url, function(err, resp, body){
    //console.log("Before: " + body);
    body = JSON.parse(body);
    // logic used to compare search results with the input from user
    //console.log("After: \n\n\n\n " + body);
    if (!body.query.results.RDF.item) {
      craig = "No results found. Try again.";
    } else {
      craig = body.query.results.RDF.item[0]['about'];
    }
  }); 
  //console.log(url);
  res.send(craig);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
