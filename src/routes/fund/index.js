const express = require("express");
const fund = require('../../models/fund')
const verifyToken = require('../../middlewares/verifyToken')
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

var router = express.Router();

router.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    const fundAmount = parseInt(amount * 100)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: fundAmount,
        currency: "usd",
        payment_method_types: ['card'],
    })

    res.send({ clientSecret: paymentIntent.client_secret })
})

router.post('/payments', async (req, res) => {
    const payment = req.body;
    const paymentResult = await fund.create(payment)


    res.send({ paymentResult })
})

// get public fund history 

router.get('/fundHistory/:email', async (req, res) => {
    const { page, limit } = req.query;
    const result = await fund.find({ funderEmail: req.params.email }).skip((page - 1) * limit).limit(limit)

    res.send(result)
})

//get all fund history
router.get('/fundHistory', async (req, res) => {
    const { page, limit } = req.query;
    const result = await fund.find().skip((page - 1) * limit).limit(limit)

    res.send(result)
})







module.exports = router