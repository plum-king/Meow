const express = require("express");
// const router = express.Router();
const pool = require("../db.js");
const bcrypt = require("bcrypt");

exports.showMyBoardList = async (req, res) => {
    const userid = req.session.user["userid"];
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await connection.query(`SELECT * FROM post as po JOIN place as pl ON po.place_num = pl.place_num 
    WHERE user_id = ?`,  userid); 

    const nickName =  await connection.query(`SELECT nickName FROM User WHERE user_id = ?`, userid);
    console.log(nickName[0][0].nickName);
    var postNum = [];
    var placeName = [];
    var placePhoto = [];

    for(var data of result[0]){
      postNum.push(data.post_num);
      placePhoto.push(data.place_photo);
      placeName.push(data.place_name);
      }

      console.log(postNum);
    

    res.render('showMyBoardList', {title: "나의 게시글 목록", nickname : nickName[0][0].nickname, postNum : postNum, placeName : placeName, 
    placePhoto : placePhoto });
} 

exports.showMyBoard = async (req, res) => {
  const userid = req.session.user["userid"];
  const post_num = req.params.post_num;
  console.log(userid, post_num);
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await connection.query(`SELECT * FROM post as po JOIN shortReview as sr ON po.post_num = sr.post_num 
  JOIN place as pl ON po.place_num = pl.place_num 
  JOIN tag as t ON po.tag_num = t.tag_num 
  JOIN Menu as m ON pl.place_num = m.place_num
  WHERE po.post_num = ?`, [post_num]); 

  const nickName =  await connection.query(`SELECT nickname FROM User WHERE user_id = ?`, userid);  

  const result2 = await connection.query(`SELECT * FROM shortReview as sr 
  JOIN Satisfy as st ON sr.review_num = st.review_num
  WHERE sr.post_num = ?`, [post_num]); 

  var pct1s = [];
  var pct2s = [];  
  var pct3s = [];  

  for(var data of result2[0]){
    pct1s.push(data.s_pct1);
    pct2s.push(data.s_pct2);
    pct3s.push(data.s_pct3);
  }

  var sum1 = 0;
  var sum2 = 0;
  var sum3 = 0;
    
  for(var i = 0; i <pct1s.length; i++){
    sum1 += pct1s[i];
    sum2 += pct2s[i];
    sum3 += pct3s[i];
  }

  const pct1 = sum1 / pct1s.length;
  const pct2 = sum2 / pct2s.length;
  const pct3 = sum3 / pct3s.length;

  const result3 = await connection.query('SELECT qna_num, qna_cont, qna_ans, user_id FROM qna WHERE post_num = ?', [post_num]); 

  var numList =[];  
  var contList = [];
  var ansList = [];
  var userList = [];

  for(var data of result3[0]){
    numList.push(data.qna_num);
    contList.push(data.qna_cont);
    ansList.push(data.qna_ans);
    userList.push(data.user_id);
  }
  console.log(result[0][0].receipt_photo);

  res.render('showMyBoard', {title: "나의 게시글", title2 : 'Q&A', nickname : nickName[0][0].nickname, post_num : post_num, r_photo : result[0][0].receipt_photo, 
  p_photo : result[0][0].place_photo, satisfy : result[0][0].place_satisfy, placeName : result[0][0].place_name, 
  placeLoc : result[0][0].place_loc, tagCont : result[0][0].tag_cont, shortRCont1 : result[0][0].review_cont1, 
  shortRCont2 : result[0][0].review_cont2,  shortRCont3 : result[0][0].review_cont3, 
  menu_name : result[0][0].menu_name, price : result[0][0].price,
  shortRSPct1 : pct1.toFixed(1), shortRSPct2 : pct2.toFixed(1), shortRSPct3 : pct3.toFixed(1),
  user_id : userid, users_id : userList, qna_num : numList, qna_cont : contList, qna_ans : ansList
  });

  connection.release();
} 

exports.showOtherBoardList = async (req, res) => {
  const userid = req.session.user["userid"];
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await connection.query(`SELECT * FROM post as po JOIN place as pl ON po.place_num = pl.place_num`); 

  const nickName =  await connection.query(`SELECT nickname FROM User WHERE user_id = ?`, userid);

  var postNum = [];
  var placePhoto = [];
  var placeName = [];
  var postUser = [];
  

  for(var data of result[0]){
    postNum.push(data.post_num);
    placePhoto.push(data.place_photo);
    placeName.push(data.place_name);
    postUser.push(data.user_id);
    }

    console.log(postNum);
  
  
  res.render('showOtherBoardList', {title: "모든 게시글 목록", nickname : nickName[0][0].nickname, postNum : postNum, 
  placePhoto :placePhoto, placeName : placeName, post_userid : postUser });
} 

exports.showOtherBoard = async (req, res, next) => {
const userid = req.session.user["userid"];
//const post_userid = req.body.post_userid;
const post_num = req.params.post_num;
console.log(userid, post_num);

const connection = await pool.getConnection(async (conn) => conn);

const result = await connection.query(`SELECT * FROM post as po JOIN shortReview as sr ON po.post_num = sr.post_num 
JOIN place as pl ON po.place_num = pl.place_num 
JOIN tag as t ON po.tag_num = t.tag_num 
JOIN Menu as m ON pl.place_num = m.place_num
WHERE po.post_num = ?`,  [post_num] ); 

const post_userid = result[0][0].user_id;
const mynickName =  await connection.query(`SELECT nickname FROM User WHERE user_id = ?`, [userid]);  
const post_user_nickName = await connection.query(`SELECT nickname FROM User WHERE user_id = ?`, [post_userid]);  

console.log(2, mynickName[0][0].nickname);

const result2 = await connection.query(`SELECT * FROM shortReview as sr 
JOIN Satisfy as st ON sr.review_num = st.review_num
WHERE sr.post_num = ?`, [post_num]); 

var pct1s = [];
var pct2s = [];  
var pct3s = [];  

for(var data of result2[0]){
  pct1s.push(data.s_pct1);
  pct2s.push(data.s_pct2);
  pct3s.push(data.s_pct3);
}

var sum1 = 0;
var sum2 = 0;
var sum3 = 0;

for(var i = 0; i <pct1s.length; i++){
  sum1 += pct1s[i];
  sum2 += pct2s[i];
  sum3 += pct3s[i];
}

console.log(pct1s);

const pct1 = sum1 / pct1s.length;
const pct2 = sum2 / pct2s.length;
const pct3 = sum3 / pct3s.length;

console.log(pct1);

const result3 = await connection.query('SELECT qna_num, qna_cont, qna_ans, user_id FROM qna WHERE post_num = ?', [post_num]); 
if (post_userid == userid){
  var numList =[];  
  var contList = [];
  var ansList = [];
  var userList = [];

  for(var data of result3[0]){
    numList.push(data.qna_num);
    contList.push(data.qna_cont);
    ansList.push(data.qna_ans);
    userList.push(data.user_id);
  }

  res.render('showMyBoard', {title: "나의 게시글", title2 : 'Q&A', nickname : mynickName[0][0].nickname, post_num : post_num, r_photo : result[0][0].receipt_photo, 
  p_photo : result[0][0].place_photo, satisfy : result[0][0].place_satisfy, placeName : result[0][0].place_name, 
  placeLoc : result[0][0].place_loc, tagCont : result[0][0].tag_cont, 
  shortRCont1 : result[0][0].review_cont1, shortRCont2 : result[0][0].review_cont2,  shortRCont3 : result[0][0].review_cont3, 
  menu_name : result[0][0].menu_name, price : result[0][0].price,
  shortRSPct1 : pct1.toFixed(1), shortRSPct2 : pct2.toFixed(1), shortRSPct3 : pct3.toFixed(1),
  user_id : userid, users_id : userList, qna_num : numList, qna_cont : contList, qna_ans : ansList
  });
  
} else {
        var mynumList =[];  
        var numList =[];  
        var mycontList = [];
        var contList = [];
        var myansList = [];
        var ansList = [];
        var userList = [];
  
        for(var data of result3[0]){
          if(data.user_id == userid){
            mynumList.push(data.qna_num);
            mycontList.push(data.qna_cont);
            myansList.push(data.qna_ans);
          } else{
            numList.push(data.qna_num);
            contList.push(data.qna_cont);
            ansList.push(data.qna_ans);
            userList.push(data.user_id);
            }
        }
  

res.render('showOtherBoard', {title: "게시글", title2 : 'Q&A', nickname : mynickName[0][0].nickname, post_num : post_num, r_photo : result[0][0].receipt_photo, 
p_photo : result[0][0].place_photo, satisfy : result[0][0].place_satisfy, placeName : result[0][0].place_name, 
placeLoc : result[0][0].place_loc, tagCont : result[0][0].tag_cont, shortRCont1 : result[0][0].review_cont1, 
shortRCont2 : result[0][0].review_cont2,  shortRCont3 : result[0][0].review_cont3, reviewNum : result[0][0].review_num,
menu_name : result[0][0].menu_name, price : result[0][0].price,
shortRSPct1 : pct1.toFixed(1), shortRSPct2 : pct2.toFixed(1), shortRSPct3 : pct3.toFixed(1),
user_id : userid, users_id : userList, qna_num : numList, qna_cont : contList, qna_ans : ansList,
myqna_num : mynumList, myqna_cont : mycontList, myqna_ans : myansList,
pu_nickname : post_user_nickName[0][0].nickname});
};
connection.release();
//next()
} 


exports.addSatisfaction = async (req, res) => {
    const user_id = req.session.user["userid"];
    const review_num = req.body.review_num;
    const post_num = req.body.post_num;
    const mys_pct1 = req.body.mys_pct1;
    const mys_pct2 = req.body.mys_pct2;
    const mys_pct3 = req.body.mys_pct3;

    const connection = await pool.getConnection(async (conn) => conn);
    const checkUsers =  await connection.query(`SELECT user_id FROM satisfy WHERE post_num = ? and review_num = ? and user_id = ?`, [post_num, review_num, user_id]);

    console.log(checkUsers[0]);

    if(checkUsers[0].length > 0){ res.write(
      `<script type="text/javascript">alert('Already add satisfaction!')</script>`
    )
    res.write(`<script>location.href = '/OtherBoard/${post_num}'</script>`);
    } else {
      const result = await connection.query(`INSERT INTO satisfy(s_pct1, s_pct2, s_pct3, user_id, post_num, review_num)
      VALUES(?, ?, ?, ?, ?, ?)`, [mys_pct1, mys_pct2, mys_pct3,  user_id, post_num, review_num])
  
      if(result[0].affectedRows==1){
        res.write(
          `<script type="text/javascript">alert('Complete to add satisfaction!')</script>`
        )
      res.write(`<script>location.href = '/OtherBoard/${post_num}'</script>`);
        } 
    }
   connection.release();
}