const express = require("express");
// const router = express.Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");

//회원 정보 변경
exports.showEdit = (req, res, next) => {
  const userid = req.session.user["userid"];

  pool.query(
    "SELECT user_id, name, nickname, password, age, gender, job, home, introduction FROM User WHERE user_id = ?",
    [userid],
    (err, row) => {
      if (err) throw err;
      console.log(row[0]);
      res.render("updateform", {title: "회원 정보 수정", row: row[0]});
    }
  );
  // connection.release();
};

exports.updateEdit = (req, res, next) => {
  const {
    userid,
    name,
    nickname,
    confirm_pwd,
    new_pwd,
    age,
    gender,
    job,
    home,
    introduction,
  } = req.body;
  let password = req.body.password;
  // console.log(userid, name, nickname, password, age, gender, job);

  if (!bcrypt.compareSync(confirm_pwd, password)) {
    res.write(
      `<script type="text/javascript">alert('Wrong password! Please rewrite the form')</script>`
    );
    res.write('<script>window.location="/edit/:userid"</script>');
  } else {
    if (password != new_pwd) {
      password = new_pwd;
    }
    password = bcrypt.hashSync(password, 10);
    pool.query(
      "UPDATE User SET name = ?, nickname = ?, password = ?, age = ?, gender = ?, job = ?, home = ?, introduction = ? WHERE user_id = ?",
      [name, nickname, password, age, gender, job, home, introduction, userid],
      (err, row) => {
        if (err) throw err;
        if (row.affectedRows == 1) {
          req.session.user["userid"] = userid;
          req.session.user["nickname"] = nickname;
          req.session.save();
          res.write(
            `<script type="text/javascript">alert('Modify Success!')</script>`
          );
          res.write('<script>window.location="/"</script>');
        } else {
          res.write(
            `<script type="text/javascript">alert('Please rewrite the form!')</script>`
          );
          res.write('<script>window.location="/"</script>');
        }
      }
    );
    // connection.release();
  }
};
