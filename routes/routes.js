var express = require('express');
var router = express.Router();
var pool = require('../database');
var bcrypt = require('bcrypt');
var mysql = require('mysql');

router.get('/', function(req, res, next){
  res.render('index.html');
});

/* GET home page. */
router.get('/login', function(req, res, next) {
  var msg = req.flash('msg');
  res.render('start/login', {expressFlash: msg});
});

router.post('/login', function(req, res, next) {
  // GET POST parameters
  var username = req.body.username;
  var password = req.body.password;

  // If name and password are not empty
  if(username != "" && password != ""){
    pool.getConnection(function(err, con) {
      if(err) throw err;
      sql = "SELECT password FROM user WHERE username = " + mysql.escape(username);
      con.query(sql, function(err, result) {
        if(err) throw err;
        if(result.length > 0){
          // If result had field

          var hash = result[0].password;  // Get password from field
          console.log(hash);
          bcrypt.compare(password, hash, function(err, doesMatch) {
            if(doesMatch){
              // If password was correct
              con.release();
              req.session.regenerate(function(err){
                req.session.username = username;
                res.redirect('/menu');
              });
            }else{
              // If password was incorrect
              con.release();
              req.flash('msg', 'User or password incorrect');
              res.redirect('/login');
            }

          });
        }else{
          // username not found
          con.release();
          req.flash('msg', 'User or password incorrect');
          res.redirect('/login');
        }
      });
    });
  }else{
    // username or password empty
    con.release();
    req.flash('msg', 'User or password incorrect');
    res.redirect('/login');
  }
})

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

router.get('/menu', function(req, res, next) {
  /* if(!req.session || !req.session.username){
    req.flash('msg', 'Please login first');
    res.redirect('/login');
  } */
  res.render('platform/main'/* , {username: req.session.username} */);
});


module.exports = router;
