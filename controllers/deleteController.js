const express = require("express");
// const router = express.Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");

//회원 탈퇴
exports.showDelete = async (req, res, next) => {
  const userid = req.params.user_id;
  res.render("withdrawform", {title: "회원 탈퇴", userid: userid});
};

exports.updateDelete = async (req, res, next) => {
  const userid = req.session.user["userid"];
  const password = req.body.password;
  const encrypted_pw = bcrypt.hashSync(password, 10);
  try {
    const data = await pool.query("DELETE FROM user WHERE user_id = ?", [
      userid,
    ]);
    if (bcrypt.compareSync(password, encrypted_pw)) {
      req.session.destroy((err) => {
        if (err) throw err;
        else {
          res.write(
            `<script type="text/javascript">alert('Complete to delete your info!')</script>`
          );
          res.write('<script>window.location="/"</script>');
        }
      });
    } else {
      res.write(
        `<script type="text/javascript">alert('Fail to delete: please enter again!')</script>`
      );
      res.write('<script>window.location="/withdraw/:userid"</script>');
    }
  } catch (err) {
    console.error(err);
  }
};
