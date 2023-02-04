const express = require('express');
const router = express.Router();

const controllerCommunities= require('../controllers/communities');


router.get('/', controllerCommunities.getAll);

router.get('/:id', controllerCommunities.getSingleById);

router.get('/name/:communityName', controllerCommunities.getSingleBCommunityName);

router.get('/topic/:topic', controllerCommunities.getSingleByTopic);

router.post('/', controllerCommunities.createSingle);

router.put('/:id', controllerCommunities.updateSingle);

router.delete('/:id', controllerCommunities.deleteSingle);



module.exports = router;