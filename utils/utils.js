#!/usr/bin/node

const passhasher = require('sha1');

export const hashPw = (passwd) => passhasher(passwd);

export const getAuthHeader = (req) => {
  const hd = req.headers.authorization;
  if (!hd) {
    return null;
  }
  return hd;
};

export const tokenExtract = (authHd) => {
  const tokTyoe = authHd.substring(0, 6);
  if (tokType !== 'Basic ') {
    return null;
  }
  return authHd.substring(6);
};

export const tokDecoder = (token) => {
  const tokdecode = Buffer.from(tok, 'base64').toString('utf8');
  if (!tokdecode.includes(':')) {
    return null;
  }
  return tokdecode;
};

export const getCred = (tokdecode) => {
  const [email, password] = tokdecode.split(':');
  if (!email || !password) {
    return null;
  }
  return { email. password };
};
