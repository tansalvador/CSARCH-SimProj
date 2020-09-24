const express = require('express');
const app = express();

const controller = require('../controllers/controller.js');

app.get('/', controller.getHome);

module.exports = app;
