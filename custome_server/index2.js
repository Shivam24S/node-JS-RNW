// import http from "http";

// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "content-type": "text/html" });
//     res.end("<h1>hello from server</h1>");
//   })
//   .listen(5000, () => {
//     console.log("server listing on port:", 5000);
//   });

import http from "http";

import fs from "fs";

const server = http.createServer((req, res) => {
  fs.readFile("index.html", (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("file not found");
    } else {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    }
  });
});

const port = 5000;

server.listen(port, () => {
  console.log("server running on:", port);
});
