const express = require("express");
const router = express.Router();
const template = require("../lib/template.js");

router.get("/", (request, response) => {
  const title = "Meow";
  const head = "<p></p>";
  const nickname = request.session.nickname;
  let body;
  if (nickname != undefined) {
    body = `<h1>Meow</h1>
    <p>
    ${nickname}
    <a href="/logout_controller">로그아웃</a>
    <a href="/profile">프로필 추가</a>
    <a href="/board">게시글 작성</a>
    </p>
    `;
  } else {
    body = `<h1>Meow</h1>
    <p>
    <a href="/signup">회원가입</a>
    <a href="/login">로그인</a>
    </p>
    `;
  }
  //일단 html로 작성했으나 ejs로 추후 변형해도 괜찮음
  var html = template.HTML(title, head, body);
  response.send(html);
});

module.exports = router;
