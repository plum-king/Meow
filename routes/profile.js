//프로필 백
const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.get("/profile/:userid", async (req, res, next) => {
  const nickname = req.session.user["nickname"];
  const myid = req.session.user["userid"];
  const userid = req.params.userid;

  let isUser;
  if (userid == myid) isUser = true;
  else isUser = false;

  try {
    const data = await pool.query(
      "SELECT user_id, age, gender, job, home, introduction FROM User WHERE user_id = ?",
      [userid]
    );
    console.log(data[0][0]);
    res.render("user/profile", {
      title: "프로필",
      user: isUser,
      nickname: nickname,
      row: data[0][0],
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
