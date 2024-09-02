#!/usr/bin/node

const express = require('express');
const AppController = require('../controllers/AppController');
const UserController = require('../controllers/UsersController');

const route = express.Router();

route.get('/status', AppController.getStatus);
route.get('/stats', AppController.getStats);
route.get('/users', UserController.postNew);

module.exports = route;
