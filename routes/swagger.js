const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { requiresAuth } = require('express-openid-connect');
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', requiresAuth(), swaggerUi.setup(swaggerDocument));

module.exports = router;