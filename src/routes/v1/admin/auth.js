const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('auth admin');
  res.send('ok');
});

module.exports = router;
