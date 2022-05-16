const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const title = "Meow";

  if (req.session.user) {
    const nickname = req.session.user["nickname"];
    console.log(nickname);
    res.render("main", {title: title, nickname: nickname});
  } else {
    res.render("loginMain", {title: title});
  }
});

module.exports = router;
