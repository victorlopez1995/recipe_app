
const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.use('/', require('./swagger'));
router.use('/userinfo', require('./userinfo'))
router.use('/recipeinfo', require('./recipeinfo'))
router.use('/comment', require('./comment'))
router.use('/communities',requiresAuth(), require('./communities'))


module.exports = router;