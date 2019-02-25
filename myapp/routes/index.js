var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node-mysql-crud',
  debug: false
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Connect database
router.get('/testdb', function(req, res) {
  if(db != null) {
    res.send('Connection success');
  } else {
    res.send('Connection failed');
  }
});

// Show book
router.get('/select', function(req, res) {
  db.query('SELECT * FROM tb_book', function(err, rs) {
    res.render('select', { books: rs });
  });
});

module.exports = router;
