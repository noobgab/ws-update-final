var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');

var indexRouter = require('./routes/index');

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

// Connect to the database, throw an error if something is wrong
con.connect(function(err) {
	if(err) throw err;
	console.log("Database connection successful");
});

/* ===== Weather Station Routes ===== */

// Route '/data' to return the most recent set of readings
app.get('/data', function(req, res) {
	let sql = "SELECT * FROM data ORDER BY data_id DESC LIMIT 1"; // build the query
	con.query(sql, (err, result) => {
		if(result.length == 1) { res.send(result[0]); } // if some data was found, return it
		else { res.send("0"); } // otherwise return 0 (no result found, deal with this in script)
	});
});

// Route '/data/all' which will return all the data stored in the database
app.get('/data/all', function(req, res) {
	let sql = "SELECT * FROM data ORDER BY data_id ASC";
	con.query(sql, (err, result) => {
		console.log(result.length);
		res.send(result);
	});
});

// Route '/history' will load up the historic data page
app.get('/history', function(req, res) {
	res.render('history', { title: 'WeatherY3 - Historic Data' });
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
