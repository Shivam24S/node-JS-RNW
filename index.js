const http = require("http");

const server = http.createServer((req, res) => {
  res.end("hello");
});

const port = 5000;

server.listen(port, () => {
  console.log("server listing on port", port);
});
