// 프로필 백
const express = require("express");
const router = express.Router();
const template = require("../lib/template.js");
const db = require("../db.js");

router.post("/profile_controller", (request, response) => {
    const post = request.body;
    const user_id = request.session.user_id;
    const home = post.home;
    const introduction = post.introduction;
    
    db.query(
      `UPDATE user SET home=?, introduction=? WHERE user_id="${user_id}"`, [home, introduction], (err, res) => {
        if (err) {
            console.error(err);
            response.writeHead(200, {Location: "/profile"});
            response.write(
                `<script type="text/javascript">alert('Error Occur! Please rewrite the form!')</script>`
              );
            response.write('<script>window.location="/profile"</script>');
        } else {
            console.log("성공");
            response.writeHead(302, {Location: "/"});
            response.end();
        }
      }
    );
});

module.exports = router;