var express = require("express");
var router = express.Router();
const session = require("express-session");
const pool = require("../db");
var path = require("path");
var url = require("url");

// 메뉴 기준 검색
router.get("/search", async (req, res, next) => {
  var title = "검색";
  let myid;
  if (req.session.user) {
    myid = req.session.user["userid"];
    nickname = req.session.user["nickname"];
  } else {
    myid = undefined;
  }
  var search_word = url.parse(req.url, true).query.search_word;
  // console.log(search_word);

  try {
    const searchD = await pool.query(
      `SELECT post_num, place_photo, place_name, user_id FROM post as po JOIN place as pl ON po.place_num = pl.place_num WHERE menu_name LIKE ?; `,
      ["%" + search_word + "%"]
    );

    var postNum = [];
    var placePhoto = [];
    var usersId = [];
    var placeName = [];

    for (var data of searchD[0]) {
      postNum.push(data.post_num);
      placePhoto.push(data.place_photo);
      usersId.push(data.user_id);
      placeName.push(data.place_name);
    }

    res.render("board/searchBoard", {
      title: title,
      userid: myid,
      postNum: postNum,
      placePhoto: placePhoto,
      search_word: search_word,
      usersId: usersId,
      placeName: placeName,
    });
  } catch (err) {
    console.err(err);
  }
});

module.exports = router;
