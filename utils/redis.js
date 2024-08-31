import { promisify } from 'util';
import { createClient } from 'redis';

/**
 * Represents a Client connecting to a Redis Server
 */
class RedisClient {
  constructor() {
    this.connect = createClient();
    this.connectCheck;
    this.connectionEstablished;
    this.connect.on('error', (err) => {
      console.error(err)
      this.connectCheck = false;
    })
    this.connect.on('connect', () => {
      this.connectCheck = true;
    });
  }

  /**
   * Checks out the status of Redis server
   * @retun true if active else false
   */
  isAlive() {
    if (this.connectCheck === false) {
      this.connectionEstablished = false;
      return this.connectionEstablished;
      } else {
      return this.connectionEstablished = true;
      }
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

export const redisClient = new RedisClient();
export default redisClient;
