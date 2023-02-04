const mongodb = require('../db/connect');
const { all } = require('../routes');
const ObjectId = require('mongodb').ObjectId;

const getAllComments = async (req, res, next) => {
  const result = await mongodb.getDb().db('recipe').collection('comments').find();

  result.toArray().then((lists) => 
  {
    console.log(lists)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingleComment = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid comment id.');
  }
  const commentId =  new ObjectId(req.params.id); 
  console.log(commentId)
  //new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('recipe')
    .collection('comments')
    .find({ _id: commentId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createComment = async (req, res) => {
  const comment = {
    email: req.body.email,
    date: req.body.date,
    comment: req.body.comment,
    likes: req.body.likes,
    
  };
  const response = await mongodb
  .getDb()
  .db('recipe')
  .collection('comments')
  .insertOne(comment);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error encounter when we tried to create a new comment.');
  }
};

const updateComment = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid comment id.');
  }
  const commentId = new ObjectId(req.params.id);
  const comment ={
    email: req.body.email,
    date: req.body.date,
    comment: req.body.comment,
    likes: req.body.likes,
    
  };
  const response = await mongodb
    .getDb()
    .db('recibe')
    .collection('comments')
    .replaceOne({ _id: commentId }, comment);
  console.log(response);
  if (response.modifiedCount > 0) {
      res.status(204).send();
  } else {
      res.status(500).json(response.error || 'Some error occurred while updating the comment.');
  }
 
};

const deleteComment = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid comment.');
  }
  const commentId = new ObjectId(req.params.id);
  const response = await mongodb
  .getDb()
  .db('recipe')
  .collection('comments')
  .remove({ _id: commentId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred during the process of deletion.');
  }
};

module.exports = { getAllComments, getSingleComment, createComment, updateComment, deleteComment };