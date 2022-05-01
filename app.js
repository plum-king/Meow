const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(express.static("public"));

const port = 3000;

const mainRouter = require("./routes/main.js");
app.use("/", mainRouter);

app.listen(port);
console.log(`app is listening port ${port}`);
