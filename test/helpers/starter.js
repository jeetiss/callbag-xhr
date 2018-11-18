const { config, Server } = require("karma");
const path = require("path");

const karmaConfig = config.parseConfig(path.join(__dirname, "./config.js"), {
  port: 1337
});

const server = new Server(karmaConfig, function(exitCode) {
  process.exit(exitCode);
});

server.start();
