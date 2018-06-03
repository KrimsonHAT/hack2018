var express = require('express');
var router = express.Router();
var pool = require('../database');
var mysql = require('mysql');

/* GET API is alive */
router.get('/', function(req, res, next) {
  res.send('API is alive');
});

router.get('/users', function(req, res, next) {
  pool.getConnection(function(err, con) {
    if(err) throw err;
    con.query("SELECT username FROM user", function(err, result) {
      con.release();
      if(err) throw err;
      res.json(result);
    });
  });
});

router.get('/gProjects', function(req, res, next) {
  if(!req.session || !req.session.username){
    req.flash('msg', 'Please login first');
    res.redirect('/login');
    return;
  }
  pool.getConnection(function(err, con) {
    if(err) throw err;
    sql = "SELECT p.project_id, p.leader, p.name FROM project p JOIN works_on w ON p.project_id = w.project_id JOIN user u ON w.user = u.username WHERE w.user = " + mysql.escape(req.session.username);
    con.query(sql, function(err, result) {
      con.release();
      if(err) throw err;
      res.json(result);
    });
  });
});

router.get('/gFeatures', function(req, res, next) {
  if(!req.session || !req.session.username){
    req.flash('msg', 'Please login first');
    res.redirect('/login');
    return;
  }
  if(req.session.project){
    var project = req.session.project;

    pool.getConnection(function(err, con) {
      if(err) throw err;
      sql = "SELECT f.name, f.feature_id, f.deadline, f.leader FROM project p JOIN feature f ON p.project_id = f.project_id WHERE p.project_id = " + mysql.escape(project);
      con.query(sql, function(err, result) {
        con.release();
        if(err) throw err;
        res.json(result);
      });
    });
  }else{
    res.send(false);
  }

});

// add user to project
router.post('/addUser', function(req, res, next) {
  if(!req.session || !req.session.username){
    req.flash('msg', 'Please login first');
    res.redirect('/login');
    return;
  }
  if(!req.session.project){
    res.send(false);
    return;
  }
  var user = req.body.username;
  var project = parseInt(req.session.project);
  pool.getConnection(function(err, con) {
    if(err) throw err;
    sql = "INSERT INTO works_on (user, project_id) VALUES ?";
    values = [
      [user, project]
    ];
    con.query(sql, [values], function(err, result) {
      con.release();
      if(err) throw err;
      res.send(true);
    });
  });
});

router.get('/gProyectUsers', function(req, res, next) {
  if(!req.session || !req.session.username){
    req.flash('msg', 'Please login first');
    res.redirect('/login');
    return;
  }
  if(!req.session.project){
    res.send(false);
    return;
  }
  var project = parseInt(req.session.project);
  pool.getConnection(function(err, con) {
    if(err) throw err;
    sql = "SELECT u.username FROM user u JOIN works_on w ON u.username = w.user JOIN project p ON p.project_id = w.project_id WHERE w.project_id = " + mysql.escape(project);
    con.query(sql, function(err, result) {
      con.release();
      if(err) throw err;
      res.json(result);
    });
  });
});

router.get('/gOtherUsers', function(req, res, next) {
  if(!req.session || !req.session.username){
    req.flash('msg', 'Please login first');
    res.redirect('/login');
    return;
  }
  if(!req.session.project){
    res.send(false);
    return;
  }
  var project = parseInt(req.session.project);
  pool.getConnection(function(err, con) {
    if(err) throw err;
    sql = 'SELECT username FROM user WHERE username NOT IN (SELECT u.username FROM user u JOIN works_on w ON u.username = w.user JOIN project p ON p.project_id = w.project_id WHERE p.project_id = '+mysql.escape(project)+');'
    con.query(sql, function(err, result) {
      con.release();
      if(err) throw err;
      res.json(result);
    });
  });
});

module.exports = router;
