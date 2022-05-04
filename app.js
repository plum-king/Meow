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
const loginRouter = require("./routes/login.js");
const signupRouter = require("./routes/signup.js");
const loginControllerRouter = require("./controllers/login_controller.js");
const signupControllerRouter = require("./controllers/signup_controller.js");

app.use("/", mainRouter);
app.get("/signup", signupRouter);
app.get("/login", loginRouter);
app.post("/signup_controller", signupControllerRouter);
app.post("/login_controller", loginControllerRouter);

app.listen(port);
console.log(`app is listening port ${port}`);
