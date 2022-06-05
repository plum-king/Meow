const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  const title = "Meow";
  const postRank = await pool.query(
    `SELECT post_num, place_photo, view_count, user_id FROM post`
  );
  let rank5 = new Array(); //상위 5개 게시글 랭킹 보이기
  arr = postRank[0]; //view_count만으로 정렬하기 위한 배열
  arr.sort((a, b) => b.view_count - a.view_count); //오름차순 정렬
  if (arr.length > 5) {
    for (let i = 0; i < 5; i++) {
      rank5[i] = arr[i];
    }
  } else {
    rank5 = arr; //게시글이 5개 이하일 때
  }
  // console.log(rank5);
  // console.log(arr[0]);

  if (req.session.user) {
    const nickname = req.session.user["nickname"];
    const userid = req.session.user["userid"];
    // console.log(nickname);
    res.render("main", {
      title: title,
      nickname: nickname,
      userid: userid,
      rank5: rank5,
    });
  } else {
    res.render("loginMain", {title: title, rank5: rank5, userid: "null"});
  }
});

module.exports = router;
