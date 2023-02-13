const validator = require('../helpers/validate');

const saveCommunity = (req, res, next) => {
  const validationRule = {  
    communityName: 'required|string',
    topic: 'required|string',
    usersSubscribed: 'required|integer',
    recipes: 'required',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {saveCommunity};