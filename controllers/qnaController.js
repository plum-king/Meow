const express = require("express");
const pool = require("../db.js");

// exports.showQnA = async (req, res) => {
//   //const user_id = req.params.user_id;  
//   const userid = req.session.user["userid"];
//   const post_num = req.params.post_num;      

//   const connection = await pool.getConnection(async (conn) => conn);
//   const result1 = await connection.query(`SELECT user_id FROM Post WHERE post_num = ?`, post_num); 
//   // console.log(0, result[0]);
//   const a = result1[0][0].user_id;    
//   // console.log(a);
//   if(a == userid) {
//     const result2 = await connection.query('SELECT qna_num, qna_cont, qna_ans, user_id FROM qna WHERE post_num = ?', [post_num]); 
//     // console.log(1, result2[0]);
//     var numList =[];  
//     var contList = [];
//     var ansList = [];
//     var userList = [];

//     for(var data of result2[0]){
//       numList.push(data.qna_num);
//       contList.push(data.qna_cont);
//       ansList.push(data.qna_ans);
//       userList.push(data.user_id);
//       }
//     res.render('qnaform_mypost', { title1 : "Q&A", title2 : 'Q&A LISTS', post_num : post_num, user_id : userid, 
//     users_id : userList, qna_num : numList, qna_cont : contList, qna_ans : ansList });
//     } else {
//         const result3 = await connection.query('SELECT qna_num, qna_cont, qna_ans, user_id FROM qna WHERE post_num = ?', [post_num]); 
//         //console.log(2, result3[0]);

//         var mynumList =[];  
//         var numList =[];  
//         var mycontList = [];
//         var contList = [];
//         var myansList = [];
//         var ansList = [];
//         var userList = [];
  

//         for(var data of result3[0]){
//           if(data.user_id == user_id){
//             mynumList.push(data.qna_num);
//             mycontList.push(data.qna_cont);
//             myansList.push(data.qna_ans);
//           } else{
//             numList.push(data.qna_num);
//             contList.push(data.qna_cont);
//             ansList.push(data.qna_ans);
//             userList.push(data.user_id);
//             }
//         }
//         res.render('qnaform_otherpost', { title1 : "Q&A", title2 : 'Q&A LISTS', post_num : post_num, user_id : userid, 
//         users_id : userList, qna_num : numList, qna_cont : contList, qna_ans : ansList, 
//         myqna_num : mynumList, myqna_cont : mycontList, myqna_ans : myansList }); 
//       }
//   connection.release();
// }


exports.updateQuestion = async (req, res) => {
  const {post_num, user_id, qna_cont} = req.body;
  console.log(post_num, user_id, qna_cont);

  const connection = await pool.getConnection(async (conn) => conn);
  const result = await connection.query(`insert into qna(post_num, user_id, qna_cont) 
    values(?, ?, ?)`, [post_num, user_id, qna_cont]); 
    
    if(result[0].affectedRows==1){
    res.write(
      `<script type="text/javascript">alert('Complete to write question!')</script>`
    )
    res.write(`<script>location.href = '/OtherBoard/${post_num}'</script>`);
    } else {
      res.write(
        `<script type="text/javascript">alert('Fail to write question!')</script>`
      )
      res.write(`<script>location.href = '/OtherBoard/${post_num}'</script>`);
    };

    connection.release();
}


exports.updateAnswer = async (req, res) => {
const post_num = req.body.post_num;
const qna_num = req.body.qna_num;
const qna_ans = req.body.qna_ans;

const connection = await pool.getConnection(async (conn) => conn);
for(var i = 0; i<qna_num.length; i++){
var result = await connection.query(`UPDATE qna set qna_ans = ? WHERE qna_num = ?`, [qna_ans, qna_num]); 
console.log(result);
}
if(result[0].affectedRows==1){
  res.write(
    `<script type="text/javascript">alert('Complete to write answer!')</script>`
  )
  res.write(`<script>location.href = '/MyBoard/${post_num}'</script>`);
  } else {
    res.write(
      `<script type="text/javascript">alert('Fail to write answer!')</script>`
    )
    res.write(`<script>location.href = '/MyBoard/${post_num}'</script>`);
  }
connection.release();
}

exports.deleteQuestion = async (req, res) => {
const qna_num = req.body.qna_num;
const post_num = req.body.post_num;
const connection = await pool.getConnection(async (conn) => conn);
console.log(qna_num);
const result = await connection.query('DELETE FROM qna WHERE qna_num = ?', qna_num); 
if(result[0].affectedRows==1){
  res.write(
    `<script type="text/javascript">alert('Complete to delete answer!')</script>`
  )
  res.write(`<script>location.href = '/OtherBoard/${post_num}'</script>`);
  } else {
    res.write(
      `<script type="text/javascript">alert('Fail to delete answer!')</script>`
    )
    res.write(`<script>location.href = '/OtherBoard/${post_num}'</script>`);
  };
connection.release(); 
}

