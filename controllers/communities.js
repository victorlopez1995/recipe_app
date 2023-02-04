const mongodb = require("../db/connect");
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    const result = await mongodb.getDb()
    .db()
    .collection('communities')
    .find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
}

const getSingleById = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid community Id to find a community.');
    return;
  }
    const communityId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('communities')
      .find({ _id: communityId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);  
    })
    .catch(error => {
      res.status(400).json({ message: err });
      console.error(error)
    });
  };

  const getSingleBCommunityName = async (req, res, next) => {
      const communityName = req.params.communityName;
      const result = await mongodb
        .getDb()
        .db()
        .collection('communities')
        .find({ communityName: communityName });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);  
      })
      .catch(error => {
        res.status(400).json({ message: err });
        console.error(error)
      });
    };

    const getSingleByTopic = async (req, res, next) => {
          const topic = req.params.topic;
          const result = await mongodb
            .getDb()
            .db()
            .collection('communities')
            .find({ topic: topic });
          result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);  
          })
          .catch(error => {
            res.status(400).json({ message: err });
            console.error(error)
          });
        };

  const createSingle = async (req, res, next) => {
    const community = {
        communityName: req.body.communityName,
        topic: req.body.topic,
        usersSubscribed: req.body.usersSubscribed,
        recipes: req.body.recipes,
    };
    const createCommunity = await mongodb
    .getDb()
    .db()
    .collection('communities')
    .insertOne(community).then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      res.status(400).json({ message: err });
      console.error(error)})
  }

  const updateSingle = async (req, res, next) =>{
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to find a community.');
      return;
    }else{
    const communityId = new ObjectId(req.params.id);
    const community = {
        communityName: req.body.communityName,
        topic: req.body.topic,
        usersSubscribed: req.body.usersSubscribed,
        recipes: req.body.recipes,
    };
    const update = await mongodb
    .getDb()
    .db()
    .collection('communities')
    .replaceOne({_id: communityId}, community).then(result =>{
      res.status(204).send();
    })
    .catch(error => {
      res.status(400).json({ message: err });
      console.error(error);
    })
    }
  }

  const deleteSingle = async (req, res, next) =>{
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid user id to delete a community.');
      return;
    }
    const communityId = new ObjectId(req.params.id);
    const deleteCommunity = await mongodb
    .getDb()
    .db()
    .collection('communities')
    .deleteOne({_id: communityId}).then(result =>{
      res.status(200).send();
    })
    .catch(error => {
      res.status(400).json({ message: err });
      console.error(error);
    })
  }

module.exports = { getAll, getSingleById, getSingleBCommunityName, getSingleByTopic, createSingle, updateSingle, deleteSingle};