var express = require("express");
const upuzila = require("../../models/Upuzila");

var router = express.Router();

//get districts data

router.get("/upuzila", async (req, res) => {
  const result = await upuzila.find();
  res.send(result);
});

module.exports = router;
