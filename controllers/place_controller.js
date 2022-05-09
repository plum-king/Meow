//맛집 등록 백
const express = require("express");
const router = express.Router();
const template = require("../lib/template.js");
const db = require("../db.js"); //번호 매기기
//bcrypt 추가로 비밀번호 암호화하기

router.post("/place_controller", (request, response) => {
  const post = request.body;
  const place_name = post.place_name;
  const place_loc = post.place_loc;
  const menu_name = post.menu_name;
  const price = post.price;
  var resId;

      db.query(
      `INSERT INTO place(place_name, place_loc) VALUES (?, ?)`,
      [place_name, place_loc],
      (err, res) => {
        if (err) {
          console.error(err);
          response.writeHead(200, {Location: "/place"});
          response.write(
            `<script type="text/javascript">alert('This place already exist!')</script>`
          );
        } else { 
          console.log("성공");
          resId = res.insertId;
          console.log(resId);

          db.query(
          `INSERT INTO menu(menu_name, price, place_num) VALUES (?, ?, ?)`,
          [menu_name, price, resId],
            (err, res) => {
              if (err) {
                console.error(err);
                response.writeHead(200, {Location: "/place"});
                response.write(
                  `<script type="text/javascript">alert('This menu already exist!')</script>`
                );
              } else { 
                console.log(resId);
                console.log("성공");
                //console.log(res[0].menu_name);
                response.writeHead(302, {Location: "/place"});
                response.end();
              }
            });

        }
       });

      });

module.exports = router;
