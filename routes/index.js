
const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/userInfo', require('./userinfo'))
router.use('/recipeinfo', require('./recipeinfo'))
router.use('/comment', require('./comment'))
router.use('/communities', require('./communities'))


module.exports = router;