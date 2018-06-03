var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/chat/:id', function (req, res, next) {
    res.render('chat',
      { pageTitle: 'Chat',
        pageID: 'chat'
    });
});


module.exports = router;
