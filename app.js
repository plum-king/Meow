const port = 3000,
  http = require("http");

app = http.createServer((req, res) => {
  res.write(`<h1>Success</h1>`);
  res.end();
});

app.listen(port);
console.log(`app is listening port ${port}`);
