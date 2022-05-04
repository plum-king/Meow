//회원가입 백
const express = require("express");
const router = express.Router();
const template = require("../lib/template.js");
const db = require("../db.js");
//bcrypt 추가로 비밀번호 암호화하기

router.post("/signup_controller", (request, response) => {
  const post = request.body;
  const user_id = post.id;
  const password = post.password;
  const password_check = post.password_check;
  const nickname = post.nickname;
  const name = post.name;
  const age = post.age;
  const gender = post.gender;
  const job = post.job;

  if (password == password_check) {
    db.query(
      `INSERT INTO user(user_id, name, nickname, password, age, gender, job) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, name, nickname, password, age, gender, job],
      (err, res) => {
        if (err) {
          console.error(err);
          response.writeHead(200, {Location: "/signup"});
          response.write(
            `<script type="text/javascript">alert('This ID is already exist!')</script>`
          );
        } else {
          console.log("성공");
          response.writeHead(302, {Location: "/login"});
          response.end();
        }
      }
    );
  } else {
    response.write(
      `<script type="text/javascript">alert('Error Occur! Please rewrite the form!')</script>`
    );
    response.write('<script>window.location="/signup"</script>');
  }
});

module.exports = router;
