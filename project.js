const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/" && req.method === "GET") {
    // res.writeHead(200, { "content-type": "text/html" });
    res.end("<h1>hello</h1>");
  } else if (req.url === "/about" && req.method === "GET") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h2>about page</h2>");
  }
});

server.listen(5000, () => {
  console.log("server listening on port 5000");
});
