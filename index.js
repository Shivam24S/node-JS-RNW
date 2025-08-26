const fs = require("fs");

fs.writeFileSync("hello.txt", "hello");

const data = fs.readFileSync("hello.txt", "utf-8");

console.log(data);
