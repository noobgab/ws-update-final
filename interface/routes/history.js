var express = require('express');
var router = express.Router();

/* GET historic data page. */
router.get('/history', function(req, res, next) {
  res.render('history', { title: 'WeatherY3 - Historic Data' });
});

module.exports = router;
