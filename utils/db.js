#!/usr/bin/node

const { MongoClient } = require('mongodb');
const mongo = require('mongodb');
const { hashPw } = require('./helpers');

class DBClient {
  constructor() {
    const host = (process.env.DB_HOST) ? process.env.DB_HOST : 'localhost';
    const port = (process.env.DB_PORT) ? process.env.DB_PORT : 27017;
    this.database = (process.env.DB_DATABASE) ? process.env.DB_DATABASE : 'files_manager';
    const dbUrl = `mongodb://${host}:${port}`;
    this.connCheck = false;
    this.client = new MongoClient(dbUrl, { useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.connCheck = true;
    }).catch((err) => console.log(err.message));
  }

  isAlive() {
    return this.connCheck;
  }

  async nbUsers() {
    const users = await this.client.db(this.database).collection('users').countDocuments();
    return users;
  }

  async nbFiles() {
    const users = await this.client.db(this.database).collection('files').countDocuments();
    return users;
  }

  async createUser(email, password) {
    const hashedPwd = hashPw(password);
    const user = await this.client.db(this.database).collection('users').insertOne({ email, password: hashedPwd });
    return user;
  }

  async getUser(email) {
    const user = await this.client.db(this.database).collection('users').find({ email }).toArray();
    if (!user.length) {
      return null;
    }
    return user[0];
  }

  async getUserById(id) {
    const _id = new mongo.ObjectID(id);
    const user = await this.client.db(this.database).collection('users').find({ _id }).toArray();
    if (!user.length) {
      return null;
    }
    return user[0];
  }

  async userExist(email) {
    const user = await this.getUser(email);
    if (user) {
      return true;
    }
    return false;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
