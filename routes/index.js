var express = require('express');
var router = express.Router();

const fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Michaels Express App' });
});

router.get("/list_movies", (req, res) => {
  fs.readFile(__dirname + '/' + 'movies.json', 'utf8', (err, data) => {
      res.end(data);
  });
});


module.exports = router;
