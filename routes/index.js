var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

module.exports = router;
