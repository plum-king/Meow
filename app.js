const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const ejs = require("ejs");

const port = 3000;
const main = require("./routes/main");
const login = require("./routes/login");
const logout = require("./routes/logout");
const signup = require("./routes/signup");
const profile = require("./routes/profile");
const addProfile = require("./routes/addProfile");
const editProfile = require("./routes/editProfile");
const allProfile = require("./routes/allProfile");
const editUser = require("./controllers/editController");
const deleteUser = require("./controllers/deleteController");
const addTag = require("./routes/tag");
const addBoard = require("./routes/addBoard");

app.set("view engine", "ejs");

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
app.get("/addTag", addTag);
app.post("/addTag", addTag);

app.get("/edit/:userid", editUser.showEdit);
app.post("/edit", editUser.updateEdit);

app.get("/withdraw/:userid", deleteUser.showDelete);
app.post("/withdraw", deleteUser.updateDelete);

app.get("/profile/:userid", profile);
app.get("/addProfile", addProfile);
app.post("/addProfile", addProfile);
app.get("/editProfile", editProfile);
app.post("/editProfile", editProfile);
app.get("/allProfile", allProfile);

app.get("/addBoard", addBoard);
app.post("/addBoard", addBoard);
// app.get("/editBoard", editBoard);
// app.post("/editBoard", editBoard);

app.listen(port);
console.log(`app is listening port ${port}`);
