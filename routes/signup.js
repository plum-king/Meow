//회원가입 프론트

const express = require("express");
const router = express.Router();
const template = require("../lib/template.js");

router.get("/signup", (request, response) => {
  const title = "회원가입";
  const head = ``;

  const body = `<form action="/signup_controller" method="post">
  <p id="id_input">ID</p>
  <input type="text" name="id" id="id" placeholder="ID">
  <p id="pw_input">Password</p>
  <input type="password" name="password" id="password" placeholder="Password">
  <br>
  <input type="password" name="password_check" id="passwordCheck" placeholder="Password Confirm">
  <br>
  <p id="name_input">Name</p>
  <input type="text" name="name" class="input-type" id="name" placeholder="Name">
  <br>
  <p id="nickname_input">Nickname</p>
  <input type="text" name="nickname" id="nickname" placeholder="Nickname">
  <br>
  <p id="age_input">Age</p>
  <input type="text" name="age" id="age" placeholder="Age">
  <br>
  <p id="gender_input">Gender</p>
  <input type="text" name="gender" id="gender" placeholder="Gender">
  <br>
  <p id="job_input">Job</p>
  <input type="text" name="job" id="job" placeholder="Job">
  <br>
  <br>
  <button type="submit" id="signupBtn">Sign up</button>
</form>
<a href="/">뒤로가기</a>
`;
  var html = template.HTML(title, head, body);
  response.send(html);
});

module.exports = router;
