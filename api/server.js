const express = require('express');
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

const server = express();

server.use(express.json());
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (_, res) => {
  res.send(`<h1>Enter a valid endpoint dude</h1>`)
})

module.exports = server;
