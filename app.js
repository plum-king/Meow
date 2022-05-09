const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
// const layouts = require("express-ejs-layouts");
const ejs = require("ejs");
// const path = require("path");

const port = 3000;
const main = require("./routes/main");
const login = require("./routes/login");
const logout = require("./routes/logout");
const signup = require("./routes/signup");

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(layouts);
// app.set("layout", "layout");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(express.static("public"));

//로그인 후 세션 유지를 위한 코드
app.use(
  session({
    secret: "my key",
    resave: false,
    saveUninitialize: true,
  })
);

app.use("/", main);
app.get("/signup", signup);
app.post("/signup", signup);
app.get("/login", login);
app.post("/login", login);
app.get("/logout", logout);

app.listen(port);
console.log(`app is listening port ${port}`);
