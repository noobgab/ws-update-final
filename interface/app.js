var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');

var indexRouter = require('./routes/index');

var app = express();

var con = mysql.createConnection({
	host: "localhost",
	user: "pi",
	password: "Year3",
	database: "project"
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

con.connect(function(err) {
	if(err) throw err;
	console.log("Database connection successful");
});

// Weather Station Routes
app.get('/data', function(req, res) {
	res.send("One set of data (most recent reading)");
});

app.get('/data/all', function(req, res) {
	res.send("All of the data");
});

app.get('/location', function(req, res) {
	var sql = "SELECT loc FROM location ORDER BY readtime DESC LIMIT 1";
	con.query(sql, function(err, result) {
		if(result.length == 1) { res.send(result[0].loc); }
		else { res.send("n/a"); }	
	});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
