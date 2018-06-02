var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('start/login.html');
});

router.get('/register', function(req, res, next){
   res.render('register.html'); 
});

module.exports = router;
