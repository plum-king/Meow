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

module.exports = router;
