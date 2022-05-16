//프로필 수정 백
const express = require("express");
const router = express.Router();
const pool = require("../db.js");
/*
router.get("/editBoard", (req, res, next) => {
    const userid = req.session.user["userid"];

    pool.query(
        "SELECT post_num, place_photo, receipt_photo, place_satisfy, place_num, user_id FROM User WHERE post_num = ?",
        [post_num], (err, row) => {
          if (err) throw err;
          console.log(row[0]);
          res.render("editBoard", {title: "게시글 수정", row: row[0]});
        }
    );
});
*/
router.post("/editBoard", (req, res, next) => {
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
    const userid = req.session.user["userid"];
    /*
    "UPDATE user SET home=?, introduction=? WHERE user_id=?",
    [home, introduction, userid], (err, row) => {
        */
    pool.query(
        `UPDATE place SET place_name=?, place_loc=? WHERE place_num=?`,
        [place_name, place_loc, resId],
        (err, row) => {
          if (err) {
            console.error(err);
            //res.writeHead(200, {Location: "/board"});
            res.write(
                `<script type="text/javascript">alert('Error Occur! Please rewrite the form!')</script>`
              );
            res.write('<script>window.location="/editBoard"</script>');
          } else { 
            console.log("성공1");
            resId = row.insertId;
            console.log(resId);
    
            pool.query(
                `UPDATE menu SET menu_name=?, price=? WHERE place_num=?`,
              //`INSERT INTO menu(menu_name, price, place_num) VALUES (?, ?, ?)`,
              [menu_name, price, resId],
                (err, row) => {
                  if (err) {
                    console.error(err);
                    //res.writeHead(200, {Location: "/board"});
                    //res.write('<script>window.location="/addBoard"</script>');
                    res.write(
                        `<script type="text/javascript">alert('Error Occur! Please rewrite the form!')</script>`
                      );
                    res.write('<script>window.location="/editBoard"</script>');
                    //res.write('<script>window.location="/addBoard"</script>');
                  } else { 
                    console.log(resId);
                    console.log("성공2");
                    res.write('<script>window.location="/addBoard"</script>');
                    res.end();
                  }
                });
                  
                console.log(req.session.user["userid"]); //user_id 제대로 불러왔는지 확인하기 위한 콘솔 창
            
            pool.query(
            `UPDATE post SET receipt_photo=?, place_photo=?, place_satisfy=?, place_num=? WHERE post_num=?`,
              //`INSERT INTO post(receipt_photo, place_photo, place_satisfy, place_num, view_count, user_id, tag_num) VALUES (?, ?, ?, ?, 0, ?, 1)`,
              [receipt_photo, place_photo, place_satisfy, resId, resPostId],
                (err, row) => {
                  if (err) {
                    console.error(err);
                    res.write(
                        `<script type="text/javascript">alert('Error Occur! Please rewrite the form!')</script>`
                      );
                    res.write('<script>window.location="/editBoard"</script>');
                    } else { 
                      console.log("성공3");
                      resPostId = row.insertId;
                      console.log(resPostId);
    
                      pool.query(
                        `UPDATE shortreview SET review_cont1=?, review_cont2=?, review_cont3=? WHERE post_num=?`,
                        //`INSERT INTO shortreview(post_num, review_cont1, review_cont2, review_cont3) VALUES (?, ?, ?, ?)`,
                        [review_cont1, review_cont2, review_cont3, resPostId],
                          (err, row) => {
                            if (err) {
                              console.error(err);
                              res.write(
                                `<script type="text/javascript">alert('Error Occur! Please rewrite the form!')</script>`
                              );
                            res.write('<script>window.location="/editBoard"</script>');
                            } else { 
                              console.log(resPostId);
                              console.log("성공4");
                              //res.writeHead(302, {Location: "/board"});
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