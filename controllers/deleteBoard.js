const express = require("express");
const pool = require("../db.js");

exports.showDeleteBoard = async (req, res, next) => {
    const post_num = req.body;
    try {
      const data1 = await pool.query(
        "SELECT place_num, menu_name, place_satisfy, tag_num, place_photo, receipt_photo FROM Post WHERE post_num = ?",
        [post_num]
      );
    //   const data = await pool.query(`SELECT * from tag ORDER BY tag_cont`);
    //     const data2 = await pool.query(`SELECT DISTINCT place_name from place ORDER BY place_name`);
    //     const data3 = await pool.query(`SELECT DISTINCT place_loc from place ORDER BY place_loc`);
    //     const data4 = await pool.query(`SELECT * from menu ORDER BY menu_name`);
    //   res.render("board/updateBoardform", {title: "회원 정보 수정", tags: data[0], placenames: data2[0], placelocs :data3[0], menus : data4[0]});
    } catch (err) {
      console.error(err);
    }
  };

exports.deleteBoard = async (req, res) => {
    // const qna_num = req.body.qna_num;
    const post_num = req.body;
    const connection = await pool.getConnection(async (conn) => conn);
    // console.log(qna_num);
    const result = await connection.query(
      "DELETE FROM post WHERE post_num = ?",
      [post_num]
    );
    if (result[0].affectedRows == 1) {
      res.write(
        `<script type="text/javascript">alert('Complete to delete board!')</script>`
      );
      res.write(`<script>location.href = '/'</script>`);
    } else {
      res.write(
        `<script type="text/javascript">alert('Fail to delete board!')</script>`
      );
      res.write(`<script>location.href = '/'</script>`);
    }
    connection.release();
  };