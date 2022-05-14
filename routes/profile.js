//프로필 백
const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.get("/profile", async (req, res, next) => {
  const userid = req.session.user["userid"];
  try {
    const data = await pool.query(
      "SELECT user_id, age, gender, job, home, introduction FROM User WHERE user_id = ?",
      [userid]
    );
    console.log(data[0][0]);
    res.render("profile", {title: "프로필", row: data[0][0]});
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
