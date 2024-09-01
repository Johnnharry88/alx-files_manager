#!/usr/bin/node

const redisCli = require('../utils/redis');
const dbCli = require('../utils/db');

class AppController {
  static getStatus(req, res) {
    if (redisCli.isAlive() && dbCli.isAlive()) {
      res.json({ redis: true, db: true });
      res.end();
    }
  }

  static async getStats(req, res) {
    const users = await dbCli.nbUsers();
    const files = await dbCli.nbFiles();
    res.json({ users, files });
    res.end();
  }
}

module.exports = AppController;
