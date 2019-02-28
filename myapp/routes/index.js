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
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// Connect database
router.get('/testdb', (req, res) => {
  if(db != null) {
    res.send('Connection success');
  } else {
    res.send('Connection failed');
  }
});

// Show book
router.get('/select', (req, res) => {
  db.query('SELECT * FROM tb_book', function(err, rs) {
    res.render('select', { books: rs });
  });
});

// Show movie
router.get('/all', (req, res) => {
  db.query('SELECT * FROM tb_movie', function(err, rs) {
    res.render('all', { movies: rs });
    res.json(rs);
  });
});

// Form book
router.get('/form', (req, res) => {
  res.render('form', { book: {} });
});

// Add book
router.post('/form', (req, res) => {
  db.query('INSERT INTO tb_book SET ?', req.body, function(err, rs) {
    res.redirect('/select');
  });
});

// Delete book
router.get('/delete', (req, res) => {
  db.query('DELETE FROM tb_book WHERE id = ?', req.query.id, function(err, rs) {
    res.redirect('/select');
  });
});

// Edit book
router.get('/edit', (req, res) => {
  db.query('SELECT * FROM tb_book WHERE id = ?', req.query.id, function(err, rs) {
    res.render('form', { book: rs[0] });
  });
});

router.post('/edit', (req, res) => {
  var param = [
    req.body, // data for update
    req.query.id // condition for update
  ]
  db.query('UPDATE tb_book SET ? WHERE id = ?', param, (err, rs) => {
    res.redirect('/select');
  });
});

module.exports = router;
