//프로필 추가 백
const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.get("/addProfile", (req, res, next) => {
    const userid = req.session.user["userid"];

    pool.query(
        "SELECT user_id, age, gender, job, home, introduction FROM User WHERE user_id = ?",
        [userid], (err, row) => {
          if (err) throw err;
          console.log(row[0]);
          res.render("addProfile", {title: "프로필 추가", row: row[0]});
        }
    );
});

router.post("/addProfile", (req, res, next) => {
    const post = req.body;
    const home = post.home;
    const introduction = post.introduction;
    const userid = req.session.user["userid"];

    pool.query(
        "UPDATE user SET home=?, introduction=? WHERE user_id=?",
        [home, introduction, userid], (err, row) => {
            if (err) {
                console.error(err);
                res.write(
                    `<script type="text/javascript">alert('Error Occur! Please rewrite the form!')</script>`
                  );
                res.write('<script>window.location="/addProfile"</script>');
            } else {
                console.log("성공");
                res.write('<script>window.location="/profile"</script>');
                res.end();
            }
        }
    );
});

module.exports = router;