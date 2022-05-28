const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.get("/allProfile", async (req, res, next) => {
    const nickname = req.session.user["nickname"];
    const userid = req.session.user["userid"];
    try {
        const data = await pool.query("SELECT user_id, nickname, age, gender, job FROM User");
        console.log("성공");
        res.render("user/allProfile", {title: "전체 프로필", userid: userid, nickname: nickname, data: data[0]});
    } catch (err) {
        console.err(err);
    }
});

module.exports = router;