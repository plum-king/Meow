const express = require("express");
const router = express.Router();
//const template = require("../lib/template.js");
const pool = require("../db.js");
const session = require("express-session");
//bcrypt 추가로 비밀번호 암호화하기

router.get("/addBoard", async (req, res, next) => {
  const data = await pool.query(`SELECT * from tag ORDER BY tag_cont`);
  const data2 = await pool.query(`SELECT DISTINCT place_name from place ORDER BY place_name`);
  const data3 = await pool.query(`SELECT DISTINCT place_loc from place ORDER BY place_loc`);
  const data4 = await pool.query(`SELECT * from menu ORDER BY menu_name`);

  res.render("board/addBoard", {title: "게시글 작성", tags: data[0], placenames: data2[0], placelocs :data3[0], menus : data4[0]});
});
//이미지 업로드
const multer = require("multer");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname); // 파일 확장자
    const timestamp = new Date().getTime().valueOf(); // 현재 시간
    // 새 파일명(기존파일명 + 시간 + 확장자)
    const filename = path.basename(file.originalname, ext) + timestamp + ext;
    cb(null, filename);
  },
});

var upload = multer({storage: storage});

//이미지 업로드 끝

router.post(
  "/addBoard", upload.fields([{name: "place_photo"}, {name: "receipt_photo"}]),
  async (req, res, next) => {
    const post = req.body;
    const placename_select = post.placename_select;
    const place_name = post.place_name;
    const placeloc_select = post.placeloc_select;
    let place_loc = post.place_loc;
    const menuname_select = post.menuname_select;
    let menu_name = post.menu_name;
    const price = post.price;

    const place_satisfy = post.place_satisfy;
    const tag_num = post.tag_num;
    const review_cont1 = post.review_cont1;
    const review_cont2 = post.review_cont2;
    const review_cont3 = post.review_cont3;
    const place_photo = `/images/${req.files.place_photo[0].filename}`;
    const receipt_photo = `/images/${req.files.receipt_photo[0].filename}`;

    const title = "Meow";
    const nickname = req.session.user["nickname"];

    var resPostId;
    var resRevID;
    // var resId;
    let placeId; //place_num
    try {
      let data;
      let check;
      //장소 이름 옵션에서 선택했을 때
      if(placename_select != 0){
        check = await pool.query(
          `SELECT place_loc FROM place WHERE place_name = ?`, //그 장소의 위치 db에서 가져오기
          [placename_select]
        );

        //장소 위치 옵션에서 선택했을 때
        if(placeloc_select != 0){
          place_loc = placeloc_select; //옵션에서 선택한 장소 위치 사용
        }

        //같은 장소 이름이라도 기존 db에 저장된 장소 위치와 다른 위치인지 확인
        if(check[0][0].place_loc != place_loc){
          data = await pool.query(
            `INSERT INTO place(place_name, place_loc) VALUES (?, ?)`, //장소 위치가 다르다면 이름이 같아도 db에 새로 저장
            [placename_select, place_loc]
          );
          placeId = data[0].insertId
        } else { //장소 이름, 장소 위치 모두 같다면 저장하지 않고 기존 db 데이터 사용
          data = await pool.query(
            `SELECT place_num FROM place WHERE place_name =? and place_loc = ?`,
            [placename_select, place_loc]
          );
          placeId = data[0][0].place_num;
        }
      } else{ //옵션 선택 없이 장소 이름 직접 입력했을 때
        if(placeloc_select != 0){
          place_loc = placeloc_select; //옵션에서 선택한 장소 위치가 있다면 그 위치 사용
        }

        check = await pool.query(
          `SELECT place_num, place_name FROM place WHERE place_name = ? and place_loc = ?`,
          [place_name, place_loc]
        );
        //db에 동일한 데이터가 있는지 확인 후 없다면 db에 저장
        if(check[0].length <= 0) {
        data = await pool.query(
          `INSERT INTO place(place_name, place_loc) VALUES (?, ?)`,
          [place_name, place_loc]
        );
        placeId = data[0].insertId
        } else { 
          placeId = check[0][0].place_num; //이미 있다면 기존에 저장된 데이터 사용
        }
      };

      let data2;
      let check2;
      //메뉴 옵션에서 메뉴 이름 선택했을 때
      if(menuname_select != 0){
      check2 = await pool.query(
        `SELECT menu_name FROM menu WHERE place_num = ? and menu_name = ?`, //동일한 장소의 동일한 메뉴 이름이 이미 존재하는지 확인
        [placeId, menuname_select]
      );
      
      //동일 장소의 동일 메뉴가 없다면 새로 저장
      if(check2[0].length <= 0){
      data2 = await pool.query(
        `INSERT INTO menu(menu_name, price, place_num) VALUES (?, ?, ?)`,
        [menuname_select, price, placeId]
      );
      }} else{ //메뉴 이름을 직접 입력했을 때
        check2 = await pool.query(
          `SELECT menu_name FROM menu WHERE place_num = ? and menu_name = ?`, //동일한 장소의 동일한 메뉴 이름이 이미 존재하는지 확인
          [placeId, menu_name]
        );
         //동일 장소의 동일 메뉴가 없다면 새로 저장
        if(check2[0].length <= 0)
        data2 = await pool.query(
          `INSERT INTO menu(menu_name, price, place_num) VALUES (?, ?, ?)`,
          [menu_name, price, placeId]
        );
      };

      if(menuname_select != 0) {menu_name = menuname_select};

      const data3 = await pool.query(
        `INSERT INTO post(receipt_photo, place_photo, place_satisfy, place_num, view_count, user_id, tag_num, menu_name) VALUES (?, ?, ?, ?, 0, ?, ?, ?)`,
        [
          receipt_photo,
          place_photo,
          place_satisfy,
          placeId,
          req.session.user["userid"],
          tag_num,
          menu_name
        ]
      );

      resPostId = data3[0].insertId; //삽입한 데이터의 id 받아오기

      const data4 = await pool.query(
        `INSERT INTO shortReview(post_num, review_cont1, review_cont2, review_cont3) VALUES (?, ?, ?, ?)`,
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
  }
);

module.exports = router;
