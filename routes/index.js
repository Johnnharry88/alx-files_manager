#!/usr/bin/node

const express = require('express');
const AppController = require('../controllers/AppController');
const UserController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');

const route = express.Router();

route.get('/status', AppController.getStatus);
route.get('/stats', AppController.getStats);
route.post('/users', UserController.postNew);
route.get('/connect', AuthController.getConnect);
route.get('/connect', AuthController.getConneect);
route.get('/disconnect', AuthController.getDisconnect);
route.get('/users/me', AuthController.getMe);

module.exports = route;
