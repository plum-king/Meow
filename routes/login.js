//로그인 프론트

const express = require("express");
const router = express.Router();
const template = require("../lib/template.js");

router.get("/login", (request, response) => {
  const title = "로그인";
  const head = "";
  const body = `<form action="/login_controller" method="post" className="inputField">
    <p id="id_input">ID</p>
    <input type="text" name="ID" placeholder="ID">
    <br>
    <p id="pwpara">Password</p>
    <input type="password" name="password" class="input-type" placeholder="password">
    <br><br>
<button type="submit" id="loginBtn">Log In</button>
<a href="/">뒤로가기</a>`;
  var html = template.HTML(title, head, body);
  response.send(html);
});

module.exports = router;
