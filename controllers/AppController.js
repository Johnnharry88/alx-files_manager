#!/usr/bin/node

const redisCli = require('../utils/redis');
const dbCli = require('../utils/db');

class AppController {
  static getStatus(req, res) {
    res.status(200).json({
      redis: redisCli.isAlive(),
      db: dbCli.isAlive(),
    });
    res.end();
  }

  static async getStats(req, res) {
    const users = await dbCli.nbUsers();
    const files = await dbCli.nbFiles();
    res.json({ users, files });
    res.end();
  }
}

module.exports = AppController;
