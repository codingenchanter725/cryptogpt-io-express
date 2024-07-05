const express = require('express');
const usersController = require('../controllers/usersController');
const usersRouter = express.Router();

usersRouter.post('/get-all-users', usersController.getAllUsers);

module.exports = usersRouter;