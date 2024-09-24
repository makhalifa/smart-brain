const api = require('express').Router();
const UsersController = require('./users/users.controller');

api.use('/users', UsersController);

module.exports = api;
