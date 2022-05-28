const express = require("express");
const router = express.Router();
//const template = require("../lib/template.js");
const pool = require("../db.js");
const session = require("express-session");
//bcrypt 추가로 비밀번호 암호화하기

router.get("/addBoard", async (req, res, next) => {
  const data = await pool.query(`SELECT * from tag`);
  res.render("addBoard", {title: "게시글 작성", tags: data[0]});
  /*
  if (req.query.edit) { // query가 edit으로 들어왔을 때
    res.render("/editBoard", { post }); // 아까 상세 페이지에서 찾았던 post값 넘겨주기
  }
  */
});
//이미지 업로드
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "./public/images/");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);   // 파일 확장자
    const timestamp = new Date().getTime().valueOf();   // 현재 시간
    // 새 파일명(기존파일명 + 시간 + 확장자)
    const filename = path.basename(file.originalname, ext) + timestamp + ext;
    cb(null, filename);
  },
});

var upload = multer({ storage: storage });

//이미지 업로드 끝

router.post("/addBoard", upload.fields([{ name: 'place_photo' }, { name: 'receipt_photo' }]), async (req, res, next) => {
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
  //const place_photo = post.place_photo;
  console.log(req.files.place_photo[0].filename);
  const place_photo = `/images/${req.files.place_photo[0].filename}`;
  const receipt_photo = `/images/${req.files.receipt_photo[0].filename}`;

  const title = "Meow";
  const nickname = req.session.user["nickname"];

  var resPostId;
  var resRevID;
  // var resId;
  let placeId; //place_num
  try {
    const data = await pool.query(
      `INSERT INTO place(place_name, place_loc) VALUES (?, ?)`,
      [place_name, place_loc]
    );

    placeId = data[0].insertId; //삽입한 데이터의 id 받아오기

    const data2 = await pool.query(
      `INSERT INTO menu(menu_name, price, place_num) VALUES (?, ?, ?)`,
      [menu_name, price, placeId]
    );

    const data3 = await pool.query(
      `INSERT INTO post(receipt_photo, place_photo, place_satisfy, place_num, view_count, user_id, tag_num) VALUES (?, ?, ?, ?, 0, ?, ?)`,
      [
        receipt_photo,
        place_photo,
        place_satisfy,
        placeId,
        req.session.user["userid"],
        tag_num,
      ]
    );

    resPostId = data3[0].insertId; //삽입한 데이터의 id 받아오기

    const data4 = await pool.query(
      `INSERT INTO shortreview(post_num, review_cont1, review_cont2, review_cont3) VALUES (?, ?, ?, ?)`,
      [resPostId, review_cont1, review_cont2, review_cont3]
    );

    resRevID = data4[0].insertId;

    res.write('<script>window.location="/"</script>');
    res.end();
  } catch (err) {
    console.error(err);
    res.write(
      `<script type="text/javascript">alert('This review already exist!')</script>`
    );
    res.write('<script>window.location="/addBoard"</script>');
    res.end();
  }
});

module.exports = router;