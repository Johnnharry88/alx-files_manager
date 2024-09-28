#!/usr/bin/node

const sha1 = require('sha1');

export const hashPw = (passwd) => sha1(passwd);

export const getAuthHd = (req) => {
  const header = req.headers.authorization;
  console.log(header);
  if (!header) {
    return null;
  }
  return header;
};

export const tokenExtract = (authHd) => {
  const token = authHd.split(' ')[1];
  console.log(token);
  if (!token) {
    return null;
  }
  return token;
};

export const decodeToken = (token) => {
  const decoded = Buffer.from(token, 'base64').toString();
  if (!decoded) {
    return null;
  }
  return decoded;
};

export const getCred = (decoded) => {
  const [email, password] = decoded.split(':');
  if (!email || !password) {
    return null;
  }
  return { email, password };
};
