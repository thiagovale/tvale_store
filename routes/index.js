const express = require("express");
const router = express.Router();

//redirect home page to catalog
router.get("/", function (req, res, next) {
  res.redirect("/catalog");
});

module.exports = router;
