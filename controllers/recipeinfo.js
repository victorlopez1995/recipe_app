const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const { check, validationResult } = require('express-validator');

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('recipeinfo').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  try {
    const recipeId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()//this possible error for the []
      .collection('recipeinfo')
      .find({ _id: recipeId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    }).catch((err) => {
      console.error("Error getting single recipe", err);
      res.status(500).json({ message: 'An error occurred while getting a single recipe.', error: err });
    });
  } catch (error) {
    console.error("Error getting single recipe", error);
    res.status(500).json({ message: 'An error occurred while getting a single recipe.', error });
  }
};

const createRecipe = async (req, res) => {
  try {
    // Validate the request body
    await check('recipeName', 'Recipe name is required').notEmpty().run(req);
    await check('countryRecipe', 'The country for the recipe is required').notEmpty().run(req);
    await check('date', 'The date is required').notEmpty().run(req);
    await check('ingredients', 'The ingredients for the recipe is required').notEmpty().run(req);
    await check('preparation', 'The preparation for the recipe is required').notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const recipe = {
      userEmail: req.body.userEmail,
      recipeName: req.body.recipeName,
      countryRecipe: req.body.countryRecipe,
      date: req.body.date,
      ingredients: req.body.ingredients,
      preparation: req.body.preparation
    };
    const response = await mongodb.getDb().db().collection('recipeinfo').insertOne(recipe);
    if( response.acknowledged ) {
      res.status(201).json(response);
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    console.error("Error creating the recipe", error);
    res.status(500).json({ message: 'An error occurred while creating the recipe.', error });
  }
};

const updateRecipe = async (req, res) => {
  try {
    // Validate the request body
    await check('recipeName', 'Recipe name is required').notEmpty().run(req);
    await check('countryRecipe', 'The country for the recipe is required').notEmpty().run(req);
    await check('date', 'The date is required').notEmpty().run(req);
    await check('ingredients', 'The ingredients for the recipe is required').notEmpty().run(req);
    await check('preparation', 'The preparation for the recipe is required').notEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    const recipeId = new ObjectId(req.params.id);
    const recipe = {
      userEmail: req.body.userEmail,
      recipeName: req.body.recipeName,
      countryRecipe: req.body.countryRecipe,
      date: req.body.date,
      ingredients: req.body.ingredients,
      preparation: req.body.preparation
    };
    const response = await mongodb.getDb().db().collection('recipeinfo').replaceOne({ _id: recipeId }, recipe);
    if( response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    console.error("Error updating the recipe", error);
    res.status(500).json({ message: 'An error occurred while updating the recipe.', error });
  }
};

const deleteRecipe = async (req, res) => {
try {
const recipeId = new ObjectId(req.params.id);
const response = await mongodb.getDb().db().collection('recipeinfo').deleteOne({ _id: recipeId });
if (response.deletedCount > 0) {
res.status(200).send();
} else {
res.status(404).json({ message: 'Recipe not found' });
}
} catch (err) {
res.status(500).json({ message: 'An error occurred while deleting the recipe.', error: err });
}
};

module.exports = { getAll, getSingle, createRecipe, updateRecipe, deleteRecipe };