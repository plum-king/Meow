//게시글 작성 프론트

const express = require("express");
const router = express.Router();
const template = require("../lib/template.js");

router.get("/board", (request, response) => {
  const title = "게시판";
  const head = ``;

  const body = `<form action="/board_controller" method="post">
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

  <p id="placeSatisfy_input">Place Satisfaction</p>
  <input type="number" name="place_satisfy" id="placeSatisfy" placeholder="맛집 만족도">

  <p id="tagNum_input">Tag Selection</p>
  <input type="text" name="tag_num" id="tagNum" placeholder="태그 선택">
  <br>

  <p id="reviewCont1_input">Short Review 1</p>
  <input type="text" name="review_cont1" id="shortReview1" placeholder="짧은 글 후기 1">
  <br>

  <p id="reviewCont2_input">Short Review 2</p>
  <input type="text" name="review_cont2" id="shortReview2" placeholder="짧은 글 후기 2">
  <br>

  <p id="reviewCont3_input">Short Review 3</p>
  <input type="text" name="review_cont3" id="shortReview3" placeholder="짧은 글 후기 3">
  <br>

  <p id="placePhoto_input">Place Photo</p>
  <input type="file" name="place_photo" class="real-upload" accept="image/*" required multiple>
  <br>

  <p id="receiptPhoto_input">Receipt Photo</p>
  <input type="file" name="receipt_photo" class="real-upload" accept="image/*" required multiple>
  <br>

  <br>
  <button type="submit" id="boardSubBtn">게시글 등록</button>
</form>
<a href="/">뒤로가기</a>
`;
  var html = template.HTML(title, head, body);
  response.send(html);
});

module.exports = router;
