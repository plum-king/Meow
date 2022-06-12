const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const ejs = require("ejs");
const multer = require("multer");
const upload = multer({dest: "./upload"});

const port = 3000;
const main = require("./controllers/main");
const login = require("./controllers/login");
const logout = require("./controllers/logout");
const signup = require("./controllers/signup");

const profile = require("./controllers/profile");
const addProfile = require("./controllers/addProfile");
const editProfile = require("./controllers/editProfile");
const editUser = require("./controllers/editController");
const deleteUser = require("./controllers/deleteController");

const addBoard = require("./controllers/addBoard");
const editBoard = require("./controllers/editBoard");
const showBoard = require("./controllers/showBoardController");
const findBoard = require("./controllers/findBoardController");
const deleteBoard = require("./controllers/deleteBoard");
const writeQnA = require("./controllers/qnaController");

const addTag = require("./controllers/tag");

const subscribe = require("./controllers/subscribe");
const scrap = require("./controllers/scrap");

const category1 = require("./controllers/category1");
const category2 = require("./controllers/category2");
const category3 = require("./controllers/category3");

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

app.get("/edit", editUser.showEdit);

app.get("/addBoard", addBoard);
app.post("/addBoard", addBoard);
app.get("/editBoard", editBoard);
app.post("/editBoard", editBoard);

app.post("/edit", editUser.updateEdit);

app.get("/withdraw", deleteUser.showDelete);
app.post("/withdraw", deleteUser.updateDelete);
app.get("/profile/:userid", profile);
app.post("/qna/Q", writeQnA.updateQuestion);
app.post("/qna/A", writeQnA.updateAnswer);
app.post("/qna/delete", writeQnA.deleteQuestion);

app.get("/addProfile", addProfile);
app.post("/addProfile", addProfile);
app.get("/editProfile", editProfile);
app.post("/editProfile", editProfile);

app.get("/MyBoardList", showBoard.showMyBoardList);
app.get("/MyBoard/:post_num", showBoard.showMyBoard);
app.post("/MyBoard/:post_num", showBoard.showMyBoard);
app.get("/MyBoard/:post_num/delete", deleteBoard.showDeleteBoard);
app.post("/MyBoard/:post_num/delete", deleteBoard.deleteBoard);

app.get("/OtherBoardList", showBoard.showOtherBoardList);
app.get("/OtherBoard/:post_num", showBoard.showOtherBoard);
app.post("/OtherBoard/:post_num", showBoard.showOtherBoard);
app.post("/satisfaction", showBoard.addSatisfaction);
app.get("/findThroughPlace", findBoard.findThroughPlace);
app.post("/findThroughPlace", findBoard.showBoardsOfPlace);

app.post("/subscribe", subscribe);
app.post("/scrap", scrap);

app.get("/category1", category1);
app.get("/category2", category2);
app.get("/category3", category3);

app.use("/image", express.static("./upload"));

app.listen(port);
console.log(`app is listening port ${port}`);
