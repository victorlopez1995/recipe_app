const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipeinfo');

router.get('/', recipeController.getAll);

router.get('/:id', recipeController.getSingle);

module.exports = router;