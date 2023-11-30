const express = require("express");
const bloodDonation = require("../../models/bloodDonation");
const verifyToken = require('../../middlewares/verifyToken')


var router = express.Router();

//post donoReqs
router.post("/donationReqs", async (req, res) => {
  const donationReq = req.body;

  const result = await bloodDonation.create(donationReq);
  console.log(result);
  res.send(result);
});

// admin get donor request
router.get("/admin/donationReqs", async (req, res) => {
  const { page, limit } = req.query;
  const result = await bloodDonation.find().skip((page - 1) * limit).limit(limit);
  res.send(result);
});

//user get donation request list

router.get("/donationsReqs/:email", verifyToken, async (req, res) => {
  const { page, limit } = req.query;
  const result = await bloodDonation.find({ requesterEmail: req.params.email }).skip((page - 1) * limit).limit(limit);
  res.send(result);
});

//public get donation details table

router.get("/donationDetails/:id", async (req, res) => {
  const result = await bloodDonation.findOne({ _id: req.params.id });

  res.send(result);
});

//donation pending req card for public view

router.get("/donationReqPending", async (req, res) => {
  const result = await bloodDonation.find({ donationStatus: "pending" });
  res.send(result);
});

//donation submit by donor

router.patch("/donorDataInDonation/:id", async (req, res) => {
  const donor = req.body;
  const result = await bloodDonation.updateOne(
    { _id: req.params.id },
    {
      $set: {
        donorName: donor?.donorName,
        donorEmail: donor?.donorEmail,
        donationStatus: "inprogress",
      },
    }
  );

  console.log(result);
  res.send(result);
});

//donation request update status inprogres done for in
router.patch("/donationDone/:id", async (req, res) => {
  const result = await bloodDonation.updateOne(
    { _id: req.params.id },
    {
      $set: {
        donationStatus: "done",
      },
    }
  );

  console.log(result);
  res.send(result);
});
//donation request update status cancel
router.patch("/donationReqInCancel/:id", verifyToken, async (req, res) => {
  const result = await bloodDonation.updateOne(
    { _id: req.params.id },
    {
      $set: {
        donationStatus: "cancel",
      },
    }
  );


  res.send(result);
});

// donaorReq Delete

router.delete("/donorReqDelete/:id", verifyToken, async (req, res) => {
  const result = await bloodDonation.deleteOne({ _id: req.params.id });
  res.send(result)
});

module.exports = router;
