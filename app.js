const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const ejs = require("ejs");
const multer = require("multer");
const upload = multer({dest: "./upload"});

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

const addBoard = require("./routes/addBoard");
// const editBoard = require("./controllers/editBoard");
const showBoard = require("./controllers/showBoardController");
const writeQnA = require("./controllers/qnaController");
const writeBoard = require("./controllers/boardController");
const deleteBoard = require("./controllers/deleteBoard");
const addTag = require("./routes/tag");

const subscribeRouter = require("./routes/subscribe");
const scrapRouter = require("./routes/scrap");

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
// app.get("/editBoard", editBoard);
// app.post("/editBoard", editBoard);
app.post("/MyBoard/:post_num/edit", writeBoard.getBoard);
app.post("/MyBoard/:post_num/edit", writeBoard.updateBoard);
app.get("/MyBoard/:post_num/delete", deleteBoard.showDeleteBoard);
app.post("/MyBoard/:post_num/delete", deleteBoard.deleteBoard);
app.post("/qna/delete", writeQnA.deleteQuestion);

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
app.get("/allProfile", allProfile);

app.get("/MyBoardList", showBoard.showMyBoardList);
app.get("/MyBoard/:post_num", showBoard.showMyBoard);
app.post("/MyBoard/:post_num", showBoard.showMyBoard);
app.get("/OtherBoardList", showBoard.showOtherBoardList);
app.get("/OtherBoard/:post_num", showBoard.showOtherBoard);
app.post("/OtherBoard/:post_num", showBoard.showOtherBoard);
app.post("/satisfaction", showBoard.addSatisfaction);

app.post("/subscribe", subscribeRouter);
app.post("/scrap", scrapRouter);

app.use("/image", express.static("./upload"));

app.listen(port);
console.log(`app is listening port ${port}`);
