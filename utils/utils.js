#!/usr/bin/node

const passhasher = require('sha1');

export const hashPw = (passwd) => passhaasher(passwd);
export default hashPw;
