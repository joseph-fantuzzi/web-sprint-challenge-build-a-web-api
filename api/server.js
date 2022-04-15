const express = require("express");

const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

const helmet = require("helmet");
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use(helmet());

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.get("/", (req, res) => {
  res.send("it is working");
});

module.exports = server;
