const express = require('express');
const router = express.Router();

const userController = require('../controllers/userinfo');

router.get('/', userController.getAll);

router.get('/:id', userController.getSingle);

router.delete('/:id', userController.deleteSingle);

module.exports = router;
