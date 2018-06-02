var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('start/login.html');
});

router.get('/register', function(req, res, next){
   res.render('start/register.html'); 
});


router.get('/', function(req, res, next){
   res.render('index.html'); 
});


module.exports = router;
