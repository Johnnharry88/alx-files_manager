import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const rout = express.Router();

// the get Routes
rout.get('/status', AppController.getStatus);
rout.get('/stats', AppController.getStats);
rout.get('/connect', AuthController.getConnect);
rout.get('/disconnect', AuthController.getDisconnect);
rout.get('/users/me', UsersController.getMe);
rout.get('/files/:id', FilesController.getShow);
rout.get('/files', FilesController.getIndex);

// the post Routes
rout.post('/users', UsersController.postNew);
rout.post('/files', FilesController.postUpload);

module.exports = router;
