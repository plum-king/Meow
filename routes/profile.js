//프로필 프론트

const express = require("express");
const router = express.Router();
const template = require("../lib/template.js");

router.get("/profile", (request, response) => {
const title = "프로필 추가";
const head = "";
const body = `<form action="/profile_controller" method="post" className="inputField">
    <div>
    <span id="user_id">아이디</span>
    <br>
    <span id="age">연령대</span>
    <br>
    <span id="gender">성별</span>
    <br>
    <span id="job">직업</span>
    <br>
    <span id="home_input">거주지
    <input type="text" name="home" id="home" placeholder="거주지(시) 입력"> </span>
    </div>
    <br>
    <p id="intro_input">자기소개
    <input type="text" name="introduction" id="introduction" placeholder="소개 입력"></p>
    <br><br>
    <button type="submit" id="addProfile">완료</button>
    </form>
    <a href="/">뒤로가기</a>`;
    var html = template.HTML(title, head, body);
    response.send(html);
});

module.exports = router;