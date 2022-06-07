const express = require("express");
const pool = require("../db.js");

exports.getBoard = async (req, res, next) => {
  const post_num = req.params.post_num;
  try {
    const result = await pool.query(
      `SELECT * FROM post as po JOIN shortReview as sr ON po.post_num = sr.post_num 
  JOIN place as pl ON po.place_num = pl.place_num 
  JOIN tag as t ON po.tag_num = t.tag_num 
  JOIN menu as m ON pl.place_num = m.place_num and po.menu_name = m.menu_name
  WHERE po.post_num = ?`,
      [post_num]
    );
    const data1 = await pool.query(
      "SELECT place_num, menu_name, place_satisfy, tag_num, place_photo, receipt_photo FROM Post WHERE post_num = ?",
      [post_num]
    );
    const data = await pool.query(`SELECT * from tag ORDER BY tag_cont`);
    const data2 = await pool.query(
      `SELECT DISTINCT place_name from place ORDER BY place_name`
    );
    const data3 = await pool.query(
      `SELECT DISTINCT place_loc from place ORDER BY place_loc`
    );
    const data4 = await pool.query(`SELECT * from menu ORDER BY menu_name`);
    res.render("board/updateBoardform", {
      title: "게시글 수정",
      row: result[0][0],
      tags: data[0],
      placenames: data2[0],
      placelocs: data3[0],
      menus: data4[0],
      post_num: post_num,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.updateBoard = async (req, res, next) => {
  let post_num = req.params.post_num;
  let {
    place_num,
    menu_name,
    place_satisfy,
    tag_num,
    place_photo,
    receipt_photo,
    // post_num,
    placename_select,
    place_loc,
    place_name,
    menuname_select,
    price,
    review_cont1,
    review_cont2,
    review_cont3,
    review_num,
    placeloc_select,
  } = req.body;

  console.log(req);

  //const connection = await pool.getConnection(async (conn) => conn);
  let placeId; //place_num

  try {
    let data;
    let check;
    if (placename_select != 0) {
      check = await pool.query(
        `SELECT place_loc FROM place WHERE place_name = ?`,
        [placename_select]
      );
      if (placeloc_select != 0) {
        place_loc = placeloc_select;
      }
      console.log(place_loc);
      console.log(placeloc_select);
      // if (check[0][0].place_loc != placeloc_select) {
      //   place_loc = placeloc_select;
      // }
      if (check[0][0].place_loc != place_loc) {
        data = await pool.query(
          // `INSERT INTO place(place_name, place_loc) VALUES (?, ?)`,
          "UPDATE place SET place_name=?, place_loc=? WHERE place_num=?"[
            (placename_select, place_loc, place_num)
          ]
        );
        placeId = data[0].insertId;
      } else {
        data = await pool.query(
          `SELECT place_num FROM place WHERE place_name =? and place_loc = ?`,
          [placename_select, place_loc]
        );
        placeId = data[0][0].place_num;
      }
    } else {
      check = await pool.query(
        `SELECT place_num, place_name FROM place WHERE place_name = ? and place_loc = ?`,
        [place_name, place_loc]
      );
      if (check[0].length <= 0) {
        data = await pool.query(
          "UPDATE place SET place_name=?, place_loc=? WHERE place_num=?"[
            (placename_select, place_loc, place_num)
          ]
        );
        placeId = data[0].insertId;
      } else {
        placeId = check[0][0].place_num;
      }
    }

    let data2;
    let check2;
    if (menuname_select != 0) {
      check2 = await pool.query(
        `SELECT menu_name FROM menu WHERE place_num = ? and menu_name = ?`,
        [placeId, menuname_select]
      );

      if (check2[0].length <= 0) {
        data2 = await pool.query(
          //`INSERT INTO menu(menu_name, price, place_num) VALUES (?, ?, ?)`,
          "UPDATE menu SET menu_name=?, price=? WHERE place_num=?"[
            (menuname_select, price, place_num)
          ]
        );
      }
    } else {
      check2 = await pool.query(
        `SELECT menu_name FROM menu WHERE place_num = ? and menu_name = ?`,
        [placeId, menu_name]
      );
      if (check2[0].length <= 0)
        data2 = await pool.query(
          "UPDATE menu SET menu_name=?, price=? WHERE place_num=?"[
            (menu_name, price, place_num)
          ]
        );
    }

    if (menuname_select != 0) {
      menu_name = menuname_select;
    }

    const data3 = await pool.query(
      "UPDATE post SET menu_name=?, place_satisfy=?, tag_num=?, place_photo=?, receipt_photo=? WHERE post_num=?",
      [menu_name, place_satisfy, tag_num, place_photo, receipt_photo, post_num]
    );

    resPostId = data3[0].insertId; //삽입한 데이터의 id 받아오기

    const data4 = await pool.query(
      //`INSERT INTO shortReview(post_num, review_cont1, review_cont2, review_cont3) VALUES (?, ?, ?, ?)`,
      "UPDATE shortreview SET review_cont1=?, review_cont2=?, review_cont3=? WHERE review_num=?, post_num=?",
      [review_cont1, review_cont2, review_cont3, review_num, post_num]
    );

    resRevID = data4[0].insertId;

    res.write('<script>window.location="/"</script>');
    res.end();
  } catch (err) {
    console.error(err);
    res.write(
      `<script type="text/javascript">alert('This review already exist!')</script>`
    );
    res.write(`<script>window.location="/MyBoard/${post_num}/edit"</script>`);
    res.end();
  }
  //   const result = await connection.query(
  //     `insert into qna(post_num, user_id, qna_cont)
  //     values(?, ?, ?)`,
  //     [post_num, user_id, qna_cont]
  //   );
  //     const result = await connection.query(
  //         "UPDATE Post SET menu_name=?, place_satisfy=?, tag_num=?, place_photo=?, receipt_photo=? WHERE post_num=?",
  //         [menu_name, place_satisfy, tag_num, place_photo, receipt_photo, post_num]
  //     );

  //   if (result[0].affectedRows == 1) {
  //     res.write(
  //       `<script type="text/javascript">alert('Complete to edit Board!')</script>`
  //     );
  //     res.write(`<script>location.href = '/MyBoard/${post_num}'</script>`);
  //   } else {
  //     res.write(
  //       `<script type="text/javascript">alert('Fail to edit Board!')</script>`
  //     );
  //     res.write(`<script>location.href = '/MyBoard/${post_num}'</script>`);
  //   }

  // pool.release();
};

// exports.updateAnswer = async (req, res) => {
//   const post_num = req.body.post_num;
//   const qna_num = req.body.qna_num;
//   const qna_ans = req.body.qna_ans;

//   const connection = await pool.getConnection(async (conn) => conn);
//   for (var i = 0; i < qna_num.length; i++) {
//     var result = await connection.query(
//       `UPDATE qna set qna_ans = ? WHERE qna_num = ?`,
//       [qna_ans, qna_num]
//     );
//     // console.log(result);
//   }
//   if (result[0].affectedRows == 1) {
//     res.write(
//       `<script type="text/javascript">alert('Complete to write answer!')</script>`
//     );
//     res.write(`<script>location.href = '/MyBoard/${post_num}'</script>`);
//   } else {
//     res.write(
//       `<script type="text/javascript">alert('Fail to write answer!')</script>`
//     );
//     res.write(`<script>location.href = '/MyBoard/${post_num}'</script>`);
//   }
//   connection.release();
// };

// exports.deleteQuestion = async (req, res) => {
//   const qna_num = req.body.qna_num;
//   const post_num = req.body.post_num;
//   const connection = await pool.getConnection(async (conn) => conn);
//   // console.log(qna_num);
//   const result = await connection.query(
//     "DELETE FROM qna WHERE qna_num = ?",
//     qna_num
//   );
//   if (result[0].affectedRows == 1) {
//     res.write(
//       `<script type="text/javascript">alert('Complete to delete answer!')</script>`
//     );
//     res.write(`<script>location.href = '/OtherBoard/${post_num}'</script>`);
//   } else {
//     res.write(
//       `<script type="text/javascript">alert('Fail to delete answer!')</script>`
//     );
//     res.write(`<script>location.href = '/OtherBoard/${post_num}'</script>`);
//   }
//   connection.release();
// };
