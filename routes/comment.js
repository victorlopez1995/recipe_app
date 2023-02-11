const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const controllerComments= require('../controllers/comments');



router.get('/', requiresAuth(), controllerComments.getAllComments);

router.get('/:id', requiresAuth(), controllerComments.getSingleComment);

router.post('/', requiresAuth(), controllerComments.createComment);

router.put('/:id', requiresAuth(), controllerComments.updateComment);

router.delete('/:id', requiresAuth(), controllerComments.deleteComment);



module.exports = router;