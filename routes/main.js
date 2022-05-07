const express = require("express");
const router = express.Router();
const template = require("../lib/template.js");

router.get("/", (request, response) => {
  const title = "Meow";
  const head = "<p></p>";
  let body = `<h1>Meow</h1>`;

  var html = template.HTML(title, head, body);
  response.send(html);
});

//mysql 
const mysql = require("mysql");

const pool = mysql.createPool({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "PleaseBetter11",
  database: "meow",
  connectionLimit: 50
});

module.exports = pool;

//회원 정보 변경
router.get("/edit/:userid", (req, res, next) => {
  const userid = req.params.userid;

  pool.getConnection((err, connection) => {
    if(err)
        throw err  
    connection.query('SELECT user_id, name, nickname, password, age, gender, job FROM User WHERE user_id = ?', [userid], (err, row) => {
            if (err)
              throw err;
            res.render('updateform', { title : "회원 정보 수정", row : row[0]});
        });
    connection.release();
  });

});

router.post("/edit", (req, res, next) => {
  const {userid, name, nickname, password, age, gender, job} = req.body;
  // console.log(userid, name, nickname, password, age, gender, job);
  pool.getConnection((err, connection) => {
    if(err)
        throw err 
    connection.query('UPDATE User SET name = ?, nickname = ?, password = ?, age = ?, gender = ?, job = ? WHERE user_id = ?',
    [name, nickname, password, age, gender, job, userid], (err, row) => {
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
});

//회원 탈퇴
router.get("/withdraw/:userid", function(req, res, next){
  const userid = req.params.userid;
  res.render("withdrawform", {title: "회원 탈퇴", userid: userid});
});

router.post("/withdraw", function(req, res, next){
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
});

module.exports = router;