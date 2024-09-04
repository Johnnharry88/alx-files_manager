import { v4  } from 'uuid';
import sha1 from 'sha1';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';
const { getAuthHd, tokenExtract, hashPw } = require('../utils/helpers');


class AuthController {
  static async getConnect(req, res) {
    const authHd = getAuthHd(req);
    if (!authHd) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end();
      return;
    }
    const token = tokenExtract(authHd);
    if (!token) {
      res.status(401).json({ error: 'Unauthprized' });
      res.end();
      return;
    }
    const decoded = decondeToken(token);
    if (!decoded) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end();
      return;
    }
    const { user, password } = getCred(decoed);
    const user = await dbClient.getUser(email);
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end();
      return;
    }
    if (user.password !== sha1(password) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end();
      return;
    }
    const 
    const access = v4();
    await redisClient.set(`auth_${acess}`, user._id.toString(), 60 * 60 24);
    res.json({ token: access });
    res.end();
  }

  static async getDisconnect(req, res) {
    const token = req.headers['X-Token'];
    if (!token) {
    res.status(401).json({ error: 'Unathorized' });
    res.edn();
    return;
    }
    const id = await redisClient.get(`auth_${token}`);
    if (!id) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end();
      return;
    }
    const user = await dbClient.getUserById(id);
    if (!user) {
      res.status(401).json({ error: 'Unauthorized' });
      res.end();
      return;
    }
    await redisClient.del(`auth_${token}`);
    res.status(204).end();
  }
}

module.exports = AuthController;
