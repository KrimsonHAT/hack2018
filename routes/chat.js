var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/chat',function (req, res, next) {
    res.render('chat',
      { pageTitle: 'Chat',
        pageID: 'chat',
       username:req.session.username
    });
});


module.exports = router;
