//로그인 백
const express = require("express");
const router = express.Router();
const template = require("../lib/template.js");
const db = require("../db.js");

router.post("/login_controller", (request, response) => {
  const post = request.body;
  const user_id = post.id;
  const password = post.password;
  db.query(`SELECT * FROM user where user_id= ?`, [user_id], (err, res) => {
    if (err) {
      console.error(err);
      response.writeHead(200, {Location: "/login"});
      response.write(
        `<script type="text/javascript">alert('Wrong user_id or password!')</script>`
      );
      response.write('<script>window.location="/login"</script>');
    } else if (res[0].password == password) {
      console.log("성공");
      console.log(res[0].nickname);
      //새로고침해도 로그아웃되지 않도록 세션 유지될 수 있게 하는 코드
      request.session.is_logined = true;
      request.session.nickname = res[0].nickname;
      request.session.save(function () {
        response.redirect(`/`);
      });
    }
  });
});

module.exports = router;
