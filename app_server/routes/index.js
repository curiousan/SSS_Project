const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
res.send('Welcome on board');
});

module.exports = router;
