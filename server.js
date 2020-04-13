const http = require("http");

const server = http.createServer(function(req, res) {
  res.end("Hello  Nandan, Said, Mouaz");
});

server.listen(5000);

console.log("Node.js web server at port 5000 is running..");