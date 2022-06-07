const express = require("express");
const router = express.Router();
const pool = require("../db.js");
//const bcrypt = require("bcrypt");

//게시글 작성 수정

router.get("/editBoard/:post_num", async (req, res, next) => {
  const userid = req.session.user["userid"];
  var post_num = req.params.post_num; //수정할 게시글 번호

  try {
    const result = await pool.query(
      `SELECT * FROM post as po JOIN shortReview as sr ON po.post_num = sr.post_num 
  JOIN place as pl ON po.place_num = pl.place_num 
  JOIN tag as t ON po.tag_num = t.tag_num 
  JOIN menu as m ON pl.place_num = m.place_num and po.menu_name = m.menu_name
  WHERE po.post_num = ?`,
      [post_num]
    );

    const data = await pool.query(`SELECT * from tag ORDER BY tag_cont`);

    const data2 = await pool.query(
      `SELECT DISTINCT place_name from place ORDER BY place_name`
    );
    const data3 = await pool.query(
      `SELECT DISTINCT place_loc from place ORDER BY place_loc`
    );
    const data4 = await pool.query(`SELECT * from menu ORDER BY menu_name`);
    // console.log(result[0][0]);
    res.render("board/editBoard", {
      title: "게시글 수정",
      row: result[0][0],
      tags: data[0],
      placenames: data2[0],
      placelocs: data3[0],
      menus: data4[0],
      post_num: post_num,
      user_id: userid,
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/editBoard/:post_num", async (req, res, next) => {
  const post = req.body;
  const placeName = post.placename_select;
  const place_name = post.place_name;
  const placeLoc = post.placeloc_select;
  const place_loc = post.place_loc;
  const menuName = post.menuname_select;
  const menu_name = post.menu_name;
  const price = post.price;
  // const place_num = post.place_num;
  const post_num = req.params.post_num;
  const place_satisfy = post.place_satisfy;
  const tag_num = post.tag_num;
  const review_cont1 = post.review_cont1;
  const review_cont2 = post.review_cont2;
  const review_cont3 = post.review_cont3;
  const place_photo = post.place_photo;
  const receipt_photo = post.receipt_photo;
  console.log(placeName);
  console.log(post);

  const userid = req.session.user["userid"];

  try {
    const exist = await pool.query(`SELECT * FROM post where post_num = ?`, [
      post_num,
    ]);
    let existPlace = await pool.query(
      // 만약에 수정한 음식점의 이름이 이미 존재한다면 냅두고
      `SELECT * FROM place WHERE place_name =? and place_loc =?`,
      [placeName, placeLoc] //논의할 만한 것(6/6)
    );

    // console.log(exist[0]);
    console.log(existPlace[0][0]);

    if (existPlace[0][0] == undefined) {
      existPlace = await pool.query(
        //존재하지 않는다면 update
        "UPDATE place SET place_name=?, place_loc=? WHERE place_num=?",
        [place_name, place_loc, exist[0][0].place_num]
      );
      console.log(existPlace[0][0].place_name);
    }
    //placeId = data[0].insertId; //삽입한 데이터의 id 받아오기

    const existMenu = await pool.query(
      // 만약에 수정한 메뉴 이름이 이미 존재한다면 냅두고
      `SELECT menu_name, price FROM menu WHERE place_num=?`,
      [menu_name, exist[0][0].place_num]
    );

    console.log(existMenu[0]);
    console.log(existMenu[0][0]);

    if (existMenu[0][0] == undefined) {
      const data2 = await pool.query(
        //존재하지 않는다면 update, 존재하는지 검사했으니까 place_num으로 걸러서 추가해도 되겠지..?
        "UPDATE menu SET menu_name=?, price=? WHERE menu WHERE place_num=? ",
        [menu_name, price, exist[0][0].place_num]
      );
    }

    const data3 = await pool.query(
      "UPDATE post SET receipt_photo=?, place_photo=?, place_satisfy=?, place_num=?, tag_num=? WHERE post_num=?",
      [
        receipt_photo,
        place_photo,
        place_satisfy,
        exist[0][0].place_num,
        tag_num,
        post_num,
      ]
    );

    //resPostId = data3[0].insertId; //삽입한 데이터의 id 받아오기

    const data4 = await pool.query(
      "UPDATE shortreview SET review_cont1=?, review_cont2=?, review_cont3=? WHERE review_num=?",
      [review_cont1, review_cont2, review_cont3, review_num]
    );

    // console.log("성공");
    res.write(`<script>window.location="/MyBoard/${post_num}"</script>`);
    res.end();
  } catch (err) {
    console.error(err);
    res.write(
      `<script type="text/javascript">alert('Error Occur! Please rewrite the form!')</script>`
    );
    res.write(`<script>window.location="/editBoard/${post_num}"</script>`);
  }
});

module.exports = router;
