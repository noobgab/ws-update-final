var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');

var indexRouter = require('./routes/index');
var historyRouter = require('./routes/history');

var app = express();

// Local database connection configuration
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
app.use('/history', historyRouter);

// Connect to the database, throw an error if something is wrong
con.connect(function(err) {
	if(err) throw err;
	console.log("Database connection successful");
});

/* ===== Weather Station Routes ===== */

// Route '/data' to return the most recent set of readings
app.get('/data', function(req, res) {
	var sql = "SELECT humidity.reading as hr, temperature.reading as tr FROM humidity INNER JOIN temperature ON humidity.readtime = temperature.readtime ORDER BY humidity.readtime DESC LIMIT 1"; // build the query
	con.query(sql, function(err, result) {
		if(result.length == 1) { res.send(result[0]); } // if some data was found, return it
		else { res.send("0"); } // otherwise return 0 (no result found, deal with this in script)
	});
});

// Route '/data/all' which will return all the data stored in the database
app.get('/data/all', function(req, res) {
	res.send("All of the data");
});

// Route '/lcoation' which returns the most recent location stored in the database
app.get('/location', function(req, res) {
	var sql = "SELECT loc FROM location ORDER BY readtime DESC LIMIT 1"; // build the query
	con.query(sql, function(err, result) { // run the query
		if(result.length == 1) { res.send(result[0].loc); } // if a location was found, return it
		else { res.send("n/a"); } // otherwise return "n/a"
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
