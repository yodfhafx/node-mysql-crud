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
router.get('/testdb', (req, res, next) => {
  if(db != null) {
    res.send('Connection success');
  } else {
    res.send('Connection failed');
  }
});

module.exports = router;
