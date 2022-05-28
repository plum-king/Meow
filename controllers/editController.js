const express = require("express");
const pool = require("../db.js");
const bcrypt = require("bcrypt");

//회원 정보 변경
exports.showEdit = async (req, res, next) => {
  const userid = req.session.user["userid"];
  try {
    const data = await pool.query(
      "SELECT user_id, name, nickname, password, age, gender, job, home, introduction FROM User WHERE user_id = ?",
      [userid]
    );
    res.render("user/updateform", {title: "회원 정보 수정", row: data[0][0]});
  } catch (err) {
    console.error(err);
  }
};

exports.updateEdit = async (req, res, next) => {
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
    res.write('<script>window.location="/edit"</script>');
  } else {
    if (new_pwd == "") {
      password = password;
    } else if (confirm_pwd != new_pwd) {
      password = bcrypt.hashSync(new_pwd, 10);
    }
    try {
      const data = await pool.query(
        "UPDATE User SET name = ?, nickname = ?, password = ?, age = ?, gender = ?, job = ?, home = ?, introduction = ? WHERE user_id = ?",
        [name, nickname, password, age, gender, job, home, introduction, userid]
      );
      if (data[0].affectedRows == 1) {
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
    } catch (err) {
      console.error(err);
    }
  }
};
