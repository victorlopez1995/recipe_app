const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/recipeinfo', require('./recipeinfo'))


module.exports = router;