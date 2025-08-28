// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//   fs.readFile("index.html", (err, data) => {
//     res.writeHead(200, { "content-type": "text/html" });
//     res.end(data);
//   });
// });

// const port = process.env.PORT || 5000;

// server.listen(port, () => {
//   console.log(`server listening on port${port}`);
// });

const http = require("http");

const fs = require("fs");

const server = http.createServer((req, res) => {
  fs.readFile("index.html", (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("file not found");
    }
    res.writeHead(200, { "content-type": "text/html" });
    res.end(data);
  });
});

const port = 5000;

server.listen(port, () => {
  console.log(port);
});
