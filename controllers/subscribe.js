const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/subscribe", async (req, res, next) => {
  const nickname = req.session.user["nickname"];
  const myid = req.session.user["userid"];
  const userid = req.body.userid;
  //   console.log(userid);

  try {
    const subscibe = await pool.query(
      `SELECT * FROM subscribe where user_id1 = ? and user_id2 = ?`,
      [myid, userid]
    );
    if (subscibe[0][0] == undefined) {
      const data = await pool.query(
        `INSERT INTO subscribe(user_id1, user_id2) VALUES(?, ?)`,
        [myid, userid]
      );
    } else {
      const data = await pool.query(
        `DELETE FROM subscribe WHERE user_id1 =? and user_id2 =?`,
        [myid, userid]
      );
    }
    // console.log(userid);
    res.write(`<script>window.location="/profile/${userid}"</script>`);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
