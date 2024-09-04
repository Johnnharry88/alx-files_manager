#!/usr/bin/node

const { v4 } = require('uuid');
const dbCli = require('../utils/db');
const redisCli = require('../utils/redis');
const { hashPw, getAuthHeader, tokenExtract } = require('../utils/utils');
const { tokDecoder, getCred } = require('../utils/utils');

class AuthController {
  static async getConnect(req, res) {
    const authHd = getAuthHeader(req);
    if (!authHd) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end();
      return;
    }
    const tok = tokenExtract(authHd);
    if (!tok) {
      res.status(401).json({ eror: 'Unauthorized' });
      res.end();
      return;
    }
    const decoded = tokDecoder(tok);
    if (!decoded) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end();
      return;
    }
    const { email, password } = getCred(decoded);
    const user = await dbCli.getUser(email);
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end();
      return;
    }
    if (user.password !== hashPw(password)) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end();
      return;
    }
    const access = v4();
    await redisCli.set(`auth_${access}`, user._id.toString(), 60 * 60 * 24);
    res.json({ token: access });
    res.end();
  }

  static async getDisconnect(req, res) {
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
    await redisCli.del(`auth_${tok}`);
    res.status(204);
    res.end();
  }
}

module.exports = AuthController;
