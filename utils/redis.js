#!/usr/bin/node

const { createClient } = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => {
      console.log(err);
      this.connCheck = false;
    });
    this.connected = true;
    this.client.on('connect', () => {
      this.connCheck = true;
    });
  }

  isAlive() {
    return this.connCheck;
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    const val = await getAsync(key);
    return val;
  }

  async set(key, val, dur) {
    const setAsync = promisify(this.client.set).bind(this.client);
    await setAsync(key, val, 'EX', dur);
  }

  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    await delAsync(key);
  }

  async close() {
    this.redisClient.quit();
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
