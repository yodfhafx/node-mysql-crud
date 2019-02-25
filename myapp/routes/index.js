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

// Form book
router.get('/form', function(req, res) {
  res.render('form');
});

// Add book
router.post('/form', function(req, res) {
  db.query('INSERT INTO tb_book SET ?', req.body, function(err, rs) {
    res.send('insert success');
  });
});

// Delete book
router.get('/delete', function(req, res) {
  db.query('DELETE FROM tb_book WHERE id = ?', req.query.id, function(err, rs) {
    res.redirect('/selete');
  });
});

module.exports = router;
