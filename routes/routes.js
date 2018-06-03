var express = require('express');
var router = express.Router();
var pool = require('../database');
var bcrypt = require('bcrypt');
var mysql = require('mysql');

/* GET home page */
router.get('/', function(req, res, next){
  res.render('index.html');
});

/* GET login. */
router.get('/login', function(req, res, next) {
  var msg = req.flash('msg');
  res.render('start/login', {expressFlash: msg});
});

/* POST login */
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

/* GET register */
router.get('/register', function(req, res, next){
  res.render('start/register.html');
});

/* POST register */
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

/* --------------------------- Menu routes --------------------------------- */

/* GET menu */
router.get('/menu', function(req, res, next) {
  if(!req.session || !req.session.username){
    req.flash('msg', 'Please login first');
    res.redirect('/login');
    return;
  }
  res.render('platform/main', {username: req.session.username});
});

/* POST create project */
router.post('/cProject', function(req, res, next) {
  if(!req.session || !req.session.username){
    req.flash('msg', 'Please login first');
    res.redirect('/login');
    return;
  }
  var name = req.body.projname;
  var user = req.session.username;
  pool.getConnection(function(err, con) {
    if(err) throw err;
    sql = "INSERT INTO project (start_date, leader, name) VALUES (CURDATE()," + mysql.escape(user) + "," + mysql.escape(name) + ")";
    con.query(sql, function(err, result) {
      if(err) throw err;
      sql = "INSERT INTO works_on (user, project_id) VALUES ?";
      values = [
        [user, result.insertId]
      ];
      con.query(sql, [values], function(err, result) {
        con.release();
        if(err) throw err;
        res.redirect('back');
      });
    });
  });
});

/* GET features */
router.get('/project', function(req, res, next) {
  if(!req.session || !req.session.username){
    req.flash('msg', 'Please login first');
    res.redirect('/login');
    return;
  }
  var project = parseInt(req.query.project);
  var user = req.session.username;
  
  pool.getConnection(function(err, con) {
    if(err) throw err;
    sql = "SELECT p.name, IF(p.leader = w.user, 1, 0) AS is_leader FROM project p JOIN works_on w ON p.project_id = w.project_id JOIN user u ON w.user = u.username WHERE w.user ="+mysql.escape(user)+" AND w.project_id =" + mysql.escape(project);
    con.query(sql, function(err, result) {
      con.release();
      if(err) throw err;
      // If there is a user with project
      if(result.length > 0){
        // Add project to session
        req.session.project = project;
        res.render('platform/features', {isLeader: result[0].is_leader, pName: result[0].name});
      }else{
        // Remove project from session
        req.session.project = null;
        res.redirect('/menu');
      }
    });
  });
  //res.render('platform/features');
});

module.exports = router;
