const { promisify } = require('util');
const { createClient } = require('redis');

/**
 * Represents a Client connecting to a Redis Server
 */
class RedisClient {
  constructor() {
    this.connectCheck = true;
    this.connect = createClient();
    this.connect.on('error', (err) => {
      console.error(err);
      this.connectionEstablished = false;
    });
    this.connect.on('connect', () => {
      this.connectionEstablished = true;
    });
  }

  /**
   * Checks out the status of Redis server
   * @retun true if active else false
   */
  isAlive() {
    if (this.connectionEstablished === false) {
      this.connectCheck = false;
      return this.connectCheck;
    }
    return this.connectCheck;
  }

  /**
   * Get the value of a given key
   * @param {string} key- key of item to retrieve
   * @return {string | object}
   */
  async get(key) {
    return promisify(this.connect.GET).bind(this.connect)(key);
  }

  /**
   * stores a key and its value along with an time interval
   * @param {string} key of item to be stored.
   * @parma {string | number | boolean } value to be stored.
   * @param { number } expiration time of the item stord in secs
   * @return { Promise<void>}
   */
  async set(key, value, interval) {
    await promisify(this.connect.SETEX)
      .bind(this.connect)(key, interval, value);
  }

  /**
   * Delete the value of a give key from database
   * @param {String} the key of the value to delete
   * @return {Promise<void>}
   */
  async del(key) {
    await promisify(this.coonect.DEL).bind(this.connect)(key);
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
