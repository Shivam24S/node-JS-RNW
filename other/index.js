const http = require("http");

const { greet, farewell } = require("./greet");

const server = http.createServer((req, res) => {
  res.end("hello");
});

greet();

farewell();
const port = 5000;

server.listen(port, () => {
  console.log("server listing on port", port);
});
