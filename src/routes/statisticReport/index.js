const express = require("express");

const fund = require('../../models/fund')
var router = express.Router();


//get total fund amount 
router.get('/totalFund', async (req, res) => {
    const result = await fund.aggregate([
        {
            $group: {
                _id: null,
                totalAmount: { $sum: "$amount" }
            }
        }
    ])

    const totalAmount = result[0] ? result[0].totalAmount : 0;
    console.log("total fund", totalAmount);

    res.send({ totalAmount: totalAmount })

})



module.exports = router