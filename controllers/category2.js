//카테고리 백
const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.get("/category2", async (req, res, next) => {
    const userid = req.session.user["userid"];
    const nickname = req.session.user["nickname"];

    try {
        const data1 = await pool.query(
            "SELECT * FROM Post WHERE user_id IN (SELECT user_id From User WHERE gender = '남')",
        );
        const data2 = await pool.query(
            "SELECT * FROM Post WHERE user_id IN (SELECT user_id From User WHERE gender = '여')",
        );

        res.render("category/category2", {
            title: "카테고리",
            nickname: nickname,
            userid: userid,
            data1: data1[0],
            data2: data2[0],
        });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;