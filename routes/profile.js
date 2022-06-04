//프로필 백
const express = require("express");
const router = express.Router();
const pool = require("../db.js");

router.get("/profile/:userid", async (req, res, next) => {
  const nickname = req.session.user["nickname"];
  const myid = req.session.user["userid"];
  const userid = req.params.userid;

  let isUser;
  let canSubs = false;
  let subscribe; //내가 구독한 사람
  let subscribe2; //내가 이 사람을 구독한 경우

  if (userid == myid) isUser = true;
  else isUser = false;

  try {
    const data = await pool.query(
      "SELECT user_id, age, gender, job, home, introduction FROM User WHERE user_id = ?",
      [userid]
    );

    const data2 = await pool.query(
      "SELECT * FROM Qna WHERE user_id = ?",
      [userid]
    );

    subscribe = await pool.query(`SELECT * FROM subscribe WHERE user_id1 = ?`, [
      userid,
    ]);
    subscribe2 = await pool.query(
      `SELECT * FROM subscribe WHERE user_id1 = ? and user_id2 = ?`,
      [myid, userid]
    );
    // console.log(subscribe[0][0]);

    //만약 내 프로필인데 내가 구독한 사람이 없다면
    if (subscribe[0][0] == undefined && isUser) {
      subscribe = "구독자가 없습니다.";
    } else if (isUser) {
      //내 프로필인데 구독한 사람이 있다면
      // canSubs = true; 내꺼는 필요 없는 거 아님?
      subscribe = subscribe[0]; //[0].user_id2;
      //user_id2가 구독 당한 사람(지수가 지수2를 구독했으면 지수: user_id1, 지수2: user_id2
    } else if (subscribe[0][0] == undefined) {
      //내 프로필이 아니면서 구독한 사람이 없으면서
      subscribe = "구독자가 없습니다.";
      console.log("구독자x");

      if (subscribe2[0][0] != undefined) {
        // 본인은 구독을 당한 사람
        canSubs = true;
      }
    } else {
      //내 프로필이 아니면서 구독자가 있는데
      subscribe = subscribe[0]; //[0].user_id2;
      // console.log(subscribe[0].user_id2);
      if (subscribe2[0][0] != undefined) {
        // 본인은 구독을 당한 사람
        canSubs = true;
      }
    }
    // console.log(subscribe);
    // <% subscribe.forEach(sub => { %> <% }); %> : profile.ejs 코드, 구독한 사람이 여러 명이면 사용할 수 있는데 아니면 사용 불가

    res.render("user/profile", {
      title: "프로필",
      user: isUser,
      nickname: nickname,
      row: data[0][0],
      canSubs: canSubs,
      subscribe: subscribe,
      qnas : data2
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
