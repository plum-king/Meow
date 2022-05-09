//프로필 열람

const express = require("express");
const router = express.Router();
const template = require("../lib/template.js");

router.get("/profileView", (request, response) => {
  const title = "프로필";
  const head = ``;
  const body = 
    `<div>
    <span id="user_id">아이디</span>
    <br>
    <span id="age">연령대</span>
    <br>
    <span id="gender">성별</span>
    <br>
    <span id="job">직업</span>
    <br>
    <span id="home">거주지</span>
    </div>
    <br>
    <p id="intro">자기소개</p>
    <br>
    <a href="/profile">프로필 추가</a>
    <a href="/">뒤로가기</a>`;
  var html = template.HTML(title, head, body);
  response.send(html);
});

module.exports = router;