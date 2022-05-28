const express = require("express");
const router = express.Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");

//게시글 작성 수정

router.get("/editBoard", async (req, res, next) => {
  const userid = req.session.user["userid"];
  var postID; //선택 받은 게시글 번호 지정
  var placeID;
  var revID;
  try {
    const data = await pool.query(
      "SELECT review_cont1, review_cont2, review_cont3 FROM shortreview WHERE post_num = ?",
      [postID] //선택 받은 게시글 번호 불러오기
    );

    const data2 = await pool.query(
      "SELECT receipt_photo, place_photo, place_satisfy, place_num, view_count, user_id, tag_num FROM post WHERE user_id = ?",
      [postID]
    );

    const data3 = await pool.query(
      "SELECT place_name, place_loc FROM place WHERE place_num = ?",
      [placeID]
    );

    const data4 = await pool.query(
      "SELECT menu_name, price FROM menu WHERE place_num = ?",
      [placeID]
    );

    res.render("editBoard", {title: "게시글 수정", row: data[0][0]});
  } catch (err) {
    console.error(err);
  }
});

router.post("/editBoard", async (req, res, next) => {
  const post = req.body;
  const place_name = post.place_name;
  const place_loc = post.place_loc;
  const menu_name = post.menu_name;
  const price = post.price;

  const place_satisfy = post.place_satisfy;
  const tag_num = post.tag_num;
  const review_cont1 = post.review_cont1;
  const review_cont2 = post.review_cont2;
  const review_cont3 = post.review_cont3;
  const place_photo = post.place_photo;
  const receipt_photo = post.receipt_photo;

  const userid = req.session.user["userid"];

  try {
    const data = await pool.query(
      "UPDATE place SET place_name=?, place_loc=? WHERE place_num=?",
      [place_name, place_loc, placeID]
    );

    //placeId = data[0].insertId; //삽입한 데이터의 id 받아오기

    const data2 = await pool.query(
      "UPDATE menu SET menu_name=?, price=? WHERE place_num=?",
      [menu_name, price, placeID]
    );

    const data3 = await pool.query(
      "UPDATE post SET receipt_photo=?, place_photo=?, place_satisfy=?, place_num=?, user_id=?, tag_num=? WHERE post_num=?",
      [
        receipt_photo,
        place_photo,
        place_satisfy,
        placeId,
        req.session.user["userid"],
        tag_num,
        postID,
      ]
    );

    //resPostId = data3[0].insertId; //삽입한 데이터의 id 받아오기

    const data4 = await pool.query(
      "UPDATE shortreview SET review_cont1=?, review_cont2=?, review_cont3=? WHERE review_num=?",
      [resPostId, review_cont1, review_cont2, review_cont3, revID]
    );

    console.log("성공");
    res.write('<script>window.location="/"</script>');
    res.end();
  } catch (err) {
    console.error(err);
    res.write(
      `<script type="text/javascript">alert('Error Occur! Please rewrite the form!')</script>`
    );
    res.write('<script>window.location="/editBoard"</script>');
  }
});

module.exports = router;
