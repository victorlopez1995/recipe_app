const express = require('express');
const router = express.Router();

const { requiresAuth } = require('express-openid-connect');

const recipeController = require('../controllers/recipeinfo');

router.get('/', requiresAuth(), recipeController.getAll);

router.get('/:id', requiresAuth(), recipeController.getSingle);

router.post('/', requiresAuth(), recipeController.createRecipe);

router.put('/:id', requiresAuth(), recipeController.updateRecipe);

router.delete('/:id', requiresAuth(), recipeController.deleteRecipe);

module.exports = router;