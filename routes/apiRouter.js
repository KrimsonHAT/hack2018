var express = require('express');
var router = express.Router();
var pool = require('../database');

/* GET API is alive */
router.get('/', function(req, res, next) {
  res.send('API is alive');
});

router.get('/users', function(req, res, next) {
  pool.getConnection(function(err, con) {
    if(err) throw err;
    con.query("SELECT username FROM user", function(err, result) {
      if(err) throw err;
      res.json(result);
    });
  });
});

module.exports = router;
