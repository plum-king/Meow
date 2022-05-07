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

<<<<<<< HEAD
const editUser = require('./controllers/editController');
const deleteUser = require('./controllers/deleteController');
app.get("/edit/:userid", editUser.showEdit);
app.post("/edit", editUser.updateEdit);

app.get("/withdraw/:userid", deleteUser.showDelete);
app.post("/withdraw", deleteUser.updateDelete);

=======
>>>>>>> d8f830b2a4acc58bbc3f77459f7e5e0d2e2cc100
app.set("view engine", "ejs"); //ejs 추가

app.listen(port);
console.log(`app is listening port ${port}`);
