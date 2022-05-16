const express = require("express");
// const router = express.Router();
const pool = require("../db.js");

//회원 탈퇴
exports.showDelete = (req, res, next) => {
  const userid = req.params.userid;
  res.render("withdrawform", {title: "회원 탈퇴", userid: userid});
};

exports.updateDelete = (req, res, next) => {
  const userid = req.body.userid;
  const password = req.body.password; 

  pool.getConnection((err, connection) => {
    if(err)
        throw err; 
    console.log(userid, password);
    connection.query('DELETE FROM User WHERE user_id = ? AND password = ?', [userid, password],
        (err, row) => {
            if (err)
                throw err;
            if(row.affectedRows==1){
              res.send("회원 탈퇴 완료");
            }else{
              res.send("회원 탈퇴 실패 : 아이디 혹은 비밀번호가 옳지 않습니다.");
            }    
        });
    connection.release();
  });
};