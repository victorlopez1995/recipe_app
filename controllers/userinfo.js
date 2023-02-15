const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('userinfo').find();
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
      .collection('userinfo')
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    }).catch((err) => {
      console.error("Error getting single user.", err);
      res.status(500).json({ message: 'An error occurred while getting a single user.', error: err });
    });
  } catch (error) {
    console.error("Error getting single user.", error);
    res.status(500).json({ message: 'An error occurred while getting a single user.', error });
  }
};

const deleteSingle = async (req, res, next) =>{
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to find a user.');
      return;
    }
    const userId = new ObjectId(req.params.id);
    const deleteContact = await mongodb
    .getDb()
    .db()
    .collection('userinfo')
    .deleteOne({_id: userId}).then(result =>{
      res.status(200).send();
    })
    .catch(error => {
      res.status(400).json({ message: err });
      console.error(error);
    })
  }

module.exports = { getAll, getSingle, deleteSingle };