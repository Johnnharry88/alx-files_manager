#!/usr/bin/node

const dbCli = require('../utils/db');
const redisCli = require('../utils/redis');

class UsersController {
  static async postNew(req, res) {
    const email = req.body ? req.body.email : null;
    const password = req.body ? req.body.password : null;
    if (!email) {
      res.status(401).json({ error: 'Missing email' });
      res.end();
      return;
    }
    if (!password) {
      res.status(401).json({ error: 'Missing password' });
      res.end();
      return;
    }
    const existedUser = await dbCli.getUser(email);
    if (existedUser) {
      res.status(401).json({ error: 'Already exist' });
      res.end();
      return;
    }
    const user = await dbCli.createUser(email, password);
    const id = `${user.insertedId}`;
    res.status(201).json({ id, email });
    res.end();
  }

  static async getMe(req, res) {
    const tok = req.headers['x-token'];
    if (!tok) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end();
      return;
    }
    const id = await redisCli.get(`auth_${tok}`);
    if (!id) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end();
      return;
    }
    const user = await dbCli.getUserById(id);
    if (!user) {
      res.status(401).json({ error: 'Unauthhorized' });
      res.end();
      return;
    }
    res.json({ id: user._id, email: user.email });
    res.end();
  }
}

module.exports = UsersController;
