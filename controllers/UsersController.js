#!/usr/bin/node

const dbCli = require('../utils/db');
const redisCli = require('../utils/redis');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Missing email' });
      res.end();
      return;
    }
    if (!password) {
      res.status(400).json({ error: 'Missing password' });
      res.end();
      return;
    }
    const checkUser = await dbCli.userExist(email);
    if (checkUser) {
      res.status(400).json({ error: 'Already exist' });
      res.end();
      return;
    }
    const user = await dbCli.createUser(email, password);
    const id = `${user.insertedId}`;
    res.status(201).json({ id, email });
    res.end();
  }

  static async getMe(req, res) {
    const token = req.header('X-Token');
    if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end();
      return;
    }
    const id = await redisCli.get(`auth_${token}`);
    if (!id) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end();
      return;
    }
    const user = await dbCli.getUserById(id);
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end();
      return;
    }
    res.json({ id: user._id, email: user.email }).end();
  }
}

module.exports = UsersController;
