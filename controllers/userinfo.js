const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('userInfo').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('userInfo')
      .find({ _id: userId });
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
module.exports = { getAll, getSingle };