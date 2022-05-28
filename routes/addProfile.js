//프로필 추가 백
const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.get("/addProfile", async (req, res, next) => {
  const userid = req.session.user["userid"];
  const nickname = req.session.user["nickname"];
  try {
    const data = await pool.query(
      "SELECT user_id, age, gender, job, home, introduction FROM User WHERE user_id = ?",
      [userid]
    );
    console.log(data[0][0]);
    res.render("addProfile", {title: "프로필 추가", nickname: nickname, row: data[0][0]});
  } catch (err) {
    console.error(err);
  }
});

router.post("/addProfile", async (req, res, next) => {
  const post = req.body;
  const home = post.home;
  const introduction = post.introduction;
  const userid = req.session.user["userid"];
  try {
    const data = await pool.query(
      "UPDATE user SET home=?, introduction=? WHERE user_id=?",
      [home, introduction, userid]
    );
    console.log("성공");
    res.write(`<script>window.location="/profile/${userid}"</script>`);
    res.end();
  } catch (err) {
    console.error(err);
    res.write(
      `<script type="text/javascript">alert('Error Occur! Please rewrite the form!')</script>`
    );
    res.write('<script>window.location="/addProfile"</script>');
  }
});

module.exports = router;
