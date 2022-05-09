const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");

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

const port = 3000;

const mainRouter = require("./routes/main.js");
const loginRouter = require("./routes/login.js");
const signupRouter = require("./routes/signup.js");
const boardRouter = require("./routes/board.js");
const profileRouter = require("./routes/profile.js");
const loginControllerRouter = require("./controllers/login_controller.js");
const logoutControllerRouter = require("./controllers/logout_controller.js");
const signupControllerRouter = require("./controllers/signup_controller.js");
const boardControllerRouter = require("./controllers/board_controller.js");
const profileControllerRouter = require("./controllers/profile_controller.js");

app.use("/", mainRouter);
app.get("/signup", signupRouter);
app.get("/login", loginRouter);
app.get("/board", boardRouter);
app.get("/profile", profileRouter);
app.post("/signup_controller", signupControllerRouter);
app.post("/login_controller", loginControllerRouter);
app.get("/logout_controller", logoutControllerRouter);
app.post("/board_controller", boardControllerRouter);
app.post("/profile_controller", profileControllerRouter);

app.listen(port);
console.log(`app is listening port ${port}`);