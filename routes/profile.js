//프로필 백
const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.get("/profile", (req, res, next) => {
    const userid = req.session.user["userid"];

    pool.query(
        "SELECT user_id, age, gender, job, home, introduction FROM User WHERE user_id = ?",
        [userid], (err, row) => {
          if (err) throw err;
          console.log(row[0]);
          res.render("profile", {title: "프로필", row: row[0]});
        }
    );
});

module.exports = router;