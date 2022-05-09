//맛집 작성 프론트

const express = require("express");
const router = express.Router();
const template = require("../lib/template.js");

router.get("/place", (request, response) => {
  const title = "맛집";
  const head = ``;

  const body = `<form action="/place_controller" method="post">
  <p id="placeName_input">Place Name</p>
  <input type="text" name="place_name" id="placeName" placeholder="맛집 이름">

  <p id="placeLoc_input">Place Location</p>
  <input type="text" name="place_loc" id="placeLoc" placeholder="맛집 위치">
  <br>

  <p id="menuName_input">Menu Name</p>
  <input type="text" name="menu_name" id="menuName" placeholder="대표 메뉴 이름">
  <br>

  <p id="price_input">Price</p>
  <input type="number" name="price" id="price" placeholder="대표 메뉴 가격">
  <br>

  <br>
  <button type="submit" id="placeSubBtn">맛집 등록</button>
</form>
<a href="/">뒤로가기</a>
`;
  var html = template.HTML(title, head, body);
  response.send(html);
});

module.exports = router;