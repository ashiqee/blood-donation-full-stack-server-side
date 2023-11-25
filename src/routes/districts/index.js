var express = require("express");
const districts = require("../../models/Districts");

var router = express.Router();

//get districts data

router.get("/district", async (req, res) => {
  const query = {
    title: { $regex: filter.search, $options: "i" },
  };
  const cursor = await districts.find();
});

module.exports = router;

// (err, data) => {
//     if (err) {
//       res.status(500).json({
//         error: "there was a server side error",
//       });
//     } else {
//       res.status(200).json({
//         result: data,
//         message: "Get Data Successfully",
//       });
//     }
//   }
