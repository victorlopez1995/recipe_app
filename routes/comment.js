const express = require('express');
const router = express.Router();

const controllerComments= require('../controllers/comments');


router.get('/', controllerComments.getAllComments);

router.get('/:id', controllerComments.getSingleComment);

router.post('/', controllerComments.createComment);

router.put('/:id', controllerComments.updateComment);

router.delete('/:id', controllerComments.deleteComment);



module.exports = router;