const router = require('express').Router()
const RazorPay = require('razorpay')
const crypto = require('crypto')
require('dotenv').config()
const { verifyToken } = require('../middleware/authentication')

// create Order

router.post('/order' async (req, res) => {
    try {

        const instance = new RazorPay({
            key_id: process.env.key_id,
            key_secret: process.env.key_secret,
        });

        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };
        const order = await instance.orders.create(options);

        res.status(200).json({
            success: true,
            data : order,

        })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error!' })
    }
})


// payment verify
router.post('/verify' async (req, res) => {
    try {

        const { razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature } = req.body
        const expectedSign = crypto
            .createHmac('sha256', process.env.key_secret)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex')

        if (razorpay_signature === expectedSign) {
            res.status(200).json({ msg: 'payment verified successfully' })
        } else {
            res.status(400).json({ msg: 'invalid signature sent!' })
        }

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error!' })
    }
})


module.exports = router
