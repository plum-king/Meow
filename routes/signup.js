//회원가입 백
const express = require("express");
const router = express.Router();
// const template = require("../lib/template.js");
const pool = require("../db.js");
const bcrypt = require("bcrypt");

router.get("/signup", (req, res, next) => {
  res.render("signup", {title: "회원가입"});
});

router.post("/signup", (req, res, next) => {
  const post = req.body;
  const user_id = post.id;
  const password = post.password;
  const password_check = post.password_check;
  const nickname = post.nickname;
  const name = post.name;
  const age = post.age;
  const gender = post.gender;
  const job = post.job;

  if (password == password_check) {
    //pw와 pw확인이 동일한지 확인
    const encrypted_pw = bcrypt.hashSync(password, 10);
    console.log(encrypted_pw);
    pool.query(
      `INSERT INTO user(user_id, name, nickname, password, age, gender, job) VALUES (?, ?, ?, ?, ?, ?, ?)`, //동일하다면 제대로 된 입력이기 떄문에 db에 저장
      [user_id, name, nickname, encrypted_pw, age, gender, job],
      (err, row) => {
        if (err) {
          console.error(err);
          res.write(
            //db에 들어가는 과정에서 오류가 난다면 id가 이미 존재하는 것 -> 이 경우말고 다른 경우에도 오류가 발생할 수 있다면 오류 메세지를 바꿔야 함
            `<script type="text/javascript">alert('This ID is already exist!')</script>`
          );
          res.write('<script>window.location="/signup"</script>');
        } else {
          //db에 제대로 들어가면
          console.log("성공");
          res.write(`<script>window.location="/login"</script>`);
          res.end();
        }
      }
    );
  } else {
    //password가 다르다면
    res.write(
      `<script type="text/javascript">alert('Error Occur! Please rewrite the form!')</script>`
    );
    res.write('<script>window.location="/signup"</script>');
  }
});

module.exports = router;
