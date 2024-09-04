#!/usr/bin/node

const sha1 = require('sha1');

export const hashPw = (passwd) => sha1(passwd);

export const
