#!/usr/bin/node

const dbCli = require('../utils/db');

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
    const existedUser = await dbCli.userExist(email);
    if (existedUser) {
      res.status(400).json({ error: 'Already exist' });
      res.end();
      return;
    }
    const user = await dbCli.createUser(email, password);
    const id = `${user.inserted}`;
    res.status(201).json({ id, email });
    res.end();
  }
  
  static async getMe(req, res) {
    const { user } = req;
    res.status(200).json({ email: user.email, id: user._id.toString() });
  }
}

module.exports = UsersController;
