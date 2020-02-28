/* eslint-disable no-console */ // Remove once a logger is added
'use strict';

const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const cors = require('cors');

const Messages = require('./Messages');

const app = express(feathers());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.configure(express.rest());

app.use(express.errorHandler());
app.use(cors());

app.use('messages', new Messages());

const server = app.listen(4000);
server.on('listening', () => console.log('Server is listening on http://localhost:4000'));
