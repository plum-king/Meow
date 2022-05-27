//게시글 작성 백 (전 버전 -> addBoard로)
const express = require("express");
const router = express.Router();
const template = require("../lib/template.js");
const db = require("../db.js");
const session = require("express-session");
//bcrypt 추가로 비밀번호 암호화하기

router.post("/board_controller", async (request, response, next) => {
  const post = request.body;
  const place_name = post.place_name;
  const place_loc = post.place_loc;
  const menu_name = post.menu_name;
  const price = post.price;

  const place_satisfy = post.place_satisfy;
  const review_cont1 = post.review_cont1;
  const review_cont2 = post.review_cont2;
  const review_cont3 = post.review_cont3;
  const place_photo = post.place_photo;
  const receipt_photo = post.receipt_photo;

  console.log(place_name);

  var resPostId;
  var resId;
  try {
    const data = await pool.query(
      `INSERT INTO place(place_name, place_loc) VALUES (?, ?)`,
      [place_name, place_loc],
      (err, res) => {
        console.log("성공1");
        resId = res.insertId;
        console.log(resId);
        console.log("hi");
      }
    );
  } catch (err) {
    console.error(err);
    response.writeHead(200, {Location: "/board"});
    response.write(
      `<script type="text/javascript">alert('This place already exist!')</script>`
    );
  }
  try {
    const data2 = await pool.query(
      `INSERT INTO menu(menu_name, price, place_num) VALUES (?, ?, ?)`,
      [menu_name, price, resId],
      (err, res) => {
        console.log(resId);
        console.log("성공2");
      }
    );
  } catch (err) {
    console.error(err);
    response.writeHead(200, {Location: "/board"});
    response.write(
      `<script type="text/javascript">alert('This menu already exist!')</script>`
    );
  }

  console.log(request.session.user_id); //user_id 제대로 불러왔는지 확인하기 위한 콘솔 창
  try {
    const data3 = await pool.query(
      `INSERT INTO post(receipt_photo, place_photo, place_satisfy, place_num, view_count, user_id, tag_num) VALUES (?, ?, ?, ?, 0, ?, 1)`,
      [
        receipt_photo,
        place_photo,
        place_satisfy,
        resId,
        request.session.user_id,
      ],
      (err, res) => {
        console.log("성공3");
        resPostId = res.insertId;
        console.log(resPostId);
      }
    );
  } catch (err) {
    console.error(err);
    response.writeHead(200, {Location: "/board"});
    response.write(
      `<script type="text/javascript">alert('This board already exist!')</script>`
    );
  }
  try {
    const data4 = await pool.query(
      `INSERT INTO shortreview(post_num, review_cont1, review_cont2, review_cont3) VALUES (?, ?, ?, ?)`,
      [resPostId, review_cont1, review_cont2, review_cont3],
      (err, res) => {
        console.log(resPostId);
        console.log("성공4");
        response.writeHead(302, {Location: "/board"});
        response.end();
      }
    );
  } catch (err) {
    console.error(err);
    response.writeHead(200, {Location: "/board"});
    response.write(
      `<script type="text/javascript">alert('This review already exist!')</script>`
    );
  }
});

module.exports = router;
