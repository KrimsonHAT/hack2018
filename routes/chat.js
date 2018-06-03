var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/chat/1', function (req, res, next) {
  res.render('chat',
    { pageTitle: 'Chat',
      pageID: 'chat'
  });
});

router.get('/chat/2', function (req, res, next) {
  res.render('chat',
    { pageTitle: 'Chat2',
      pageID: 'chat2'
  });
});

module.exports = router;
