import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.end("hello from server");
});

const port = process.env.PORT || 5000;

server.listen(port, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log(`server running on ${port}`);
});
