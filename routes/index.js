const express = require('express');
const router = express.Router();

router.use('/recipeinfo', require('./recipeinfo'))

module.exports = router;