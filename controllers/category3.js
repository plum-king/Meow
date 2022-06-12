//카테고리 백
const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.get("/category3", async (req, res, next) => {
    const userid = req.session.user["userid"];
    const nickname = req.session.user["nickname"];

    try {
        const tag = await pool.query(
            "SELECT * FROM Tag ORDER BY tag_cont",  
        );

        var row = [];
        for (var i=0; i<tag[0].length; i++) {
            var data = await pool.query(
                "SELECT * FROM Post WHERE tag_num IN (SELECT tag_num From Tag WHERE tag_num = ? )",
                [tag[0][i].tag_num]
            );
            row[i] = data[0];
        }
            
        res.render("category/category3", {
            title: "카테고리",
            nickname: nickname,
            userid: userid,
            tag: tag[0],
            row: row,
        });
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;