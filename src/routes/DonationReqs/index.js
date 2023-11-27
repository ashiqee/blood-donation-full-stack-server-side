const express = require('express');
const bloodDonation = require('../../models/bloodDonation');

var router = express.Router()

//post donoReqs 
router.post('/donationReqs', async (req, res) => {
    const donationReq = req.body;


    const result = await bloodDonation.create(donationReq)
    console.log(result);
    res.send(result)
})


// admin get donor request 
router.get('/admin/donationReqs', async (req, res) => {

    const result = await bloodDonation.find()
    res.send(result)
})

//user get donation request

router.get('/donationsReqs/:email', async (req, res) => {

    const result = await bloodDonation.find({ requesterEmail: req.params.email })
    res.send(result)



})


module.exports = router