const models = require('../models/index');
const User = require('../models/user');

// Create Users
exports.create = (req, res) => {
  // create a new instance of the Users model with req body
  models.User.create({
    name: req.body.name,
    email: req.body.email
  })
    .then(user => res.json(user));
};

// List Users
exports.list = (req, res) => {
  // List all users
  models.User.findAll({})
    .then(users => res.json(users));
};