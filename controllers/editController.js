const express = require("express");
// const router = express.Router();
const pool = require("../db.js");

//회원 정보 변경
exports.showEdit = (req, res, next) => {
    const userid = req.params.userid;

    pool.getConnection((err, connection) => {
      if(err)
          throw err  
      connection.query('SELECT user_id, name, nickname, password, age, gender, job, home, introduction FROM User WHERE user_id = ?', [userid], (err, row) => {
              if (err)
                throw err;
              console.log(row[0]);
              res.render('updateform', { title : "회원 정보 수정", row : row[0]});
          });
      connection.release();
    });
  };
  
exports.updateEdit = (req, res, next) => {
    const {userid, name, nickname, confirm_pwd, new_pwd, age, gender, job, home, introduction} = req.body;
    let password = req.body.password;
    // console.log(userid, name, nickname, password, age, gender, job);

    if(password != confirm_pwd){
      res.send("잘못된 비밀번호를 입력하였습니다.");
    } else{
    if(password != new_pwd){
      password = new_pwd;
    }

    pool.getConnection((err, connection) => {
      if(err)
          throw err;
      connection.query('UPDATE User SET name = ?, nickname = ?, password = ?, age = ?, gender = ?, job = ?, home = ?, introduction = ? WHERE user_id = ?',
      [name, nickname, password, age, gender, job, home, introduction, userid], (err, row) => {
            if (err)
                throw err;
            if(row.affectedRows==1){
              res.send("회원 정보 수정 완료");
            }else{
              res.send("회원 정보 수정 실패");
            }    
        });   
      connection.release();
    });
  }
  };

