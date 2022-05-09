const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const title = "Meow";
  // const head = "<p></p>";
  // let body;
  if (req.session.user) {
    const nickname = req.session.user["nickname"];
    console.log(nickname);
    res.render("main", {title: title, nickname: nickname});
  } else {
    res.render("loginMain", {title: title});
  }
});

module.exports = router;
