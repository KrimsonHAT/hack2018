var express = require('express');
var router = express.Router();
var pool = require('../database');
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('start/login.html');
});

router.get('/register', function(req, res, next){
  res.render('start/register.html'); 
});

router.post('/register', function(req, res, next) {
  // GET POST parameters
  var username = req.body.username;
  var password = req.body.password;

  bcrypt.hash(password, 11, function(err, bcryptedPassword) {
    if(err) throw err;
    pool.getConnection(function(err, con) {
      if(err) throw err;
      sql = "INSERT INTO user (username, password) VALUES ?";
      values = [
        [username, bcryptedPassword]
      ];
      con.query(sql, [values], function(err, result) {
        con.release();
        if(err){
          res.redirect('/redirect');
        }else{
          // Redirect to avoid post problems
          res.redirect('/login');
        }
      });
    });
  });
});

router.get('/', function(req, res, next){
  res.render('index.html');
});


module.exports = router;
