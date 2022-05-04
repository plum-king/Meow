const express = require("express");
const router = express.Router();
const template = require("../lib/template.js");

router.get("/logout_controller", function (req, res) {
  if (req.session.is_logined) {
    req.session.destroy(function (err) {
      if (err) throw err;
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
