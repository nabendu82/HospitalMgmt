const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('Hospital route'));

module.exports = router;