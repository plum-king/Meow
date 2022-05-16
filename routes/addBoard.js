const express = require("express");
const router = express.Router();
//const template = require("../lib/template.js");
const pool = require("../db.js");
const session = require("express-session");
//bcrypt 추가로 비밀번호 암호화하기

router.get("/addBoard", (req, res, next) => {
    res.render("addBoard", {title: "게시글 작성"});
});

router.post("/addBoard", (req, res, next) => {
  const post = req.body;
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

  var resPostId;
  var resId;

  pool.query(
    `INSERT INTO place(place_name, place_loc) VALUES (?, ?)`,
    [place_name, place_loc],
    (err, row) => {
      if (err) {
        console.error(err);
        res.write('<script>window.location="/addBoard"</script>');
        res.write(
          `<script type="text/javascript">alert('This place already exist!')</script>`
        );
      } else { 
        console.log("성공1");
        resId = row.insertId;
        console.log(resId);

        pool.query(
          `INSERT INTO menu(menu_name, price, place_num) VALUES (?, ?, ?)`,
          [menu_name, price, resId],
            (err, row) => {
              if (err) {
                console.error(err);
                res.write(
                  `<script type="text/javascript">alert('This menu already exist!')</script>`
                );
                
              } else { 
                console.log(resId);
                console.log("성공2");
                res.write('<script>window.location="/addBoard"</script>');
                res.end();
              }
            });
              
            console.log(req.session.user["userid"]); //user_id 제대로 불러왔는지 확인하기 위한 콘솔 창
        
        pool.query(
          `INSERT INTO post(receipt_photo, place_photo, place_satisfy, place_num, view_count, user_id, tag_num) VALUES (?, ?, ?, ?, 0, ?, 1)`,
          [receipt_photo, place_photo, place_satisfy, resId, req.session.user["userid"]],
            (err, row) => {
              if (err) {
                  console.error(err);
                  res.write('<script>window.location="/addBoard"</script>');
                  res.write(
                    `<script type="text/javascript">alert('This board already exist!')</script>`
                  );
                } else { 
                  console.log("성공3");
                  resPostId = row.insertId;
                  console.log(resPostId);

                  pool.query(
                    `INSERT INTO shortreview(post_num, review_cont1, review_cont2, review_cont3) VALUES (?, ?, ?, ?)`,
                    [resPostId, review_cont1, review_cont2, review_cont3],
                      (err, row) => {
                        if (err) {
                          console.error(err);
                          res.write('<script>window.location="/addBoard"</script>');
                          res.write(
                            `<script type="text/javascript">alert('This review already exist!')</script>`
                          );
                        } else { 
                          console.log(resPostId);
                          console.log("성공4");
                          res.write('<script>window.location="/addBoard"</script>');
                          res.end();
                        }
                      });

                }
              });

            }
          });

});

module.exports = router;