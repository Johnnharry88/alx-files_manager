#!/usr/bin/node

const exp = require('express');
const route = require('./routes/index');

const xerva = exp();
const port = process.env.PORT ? process.env.PORT : 5000;

xerva.use(exp.json());
xerva.use(route);

xerva.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
});
