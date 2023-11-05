const router = require('express').Router()
const RazorPay = require('razorpay')
const crypto = require('crypto')
require('dotenv').config()
const { verifyToken } = require('../middleware/authentication')

// create Order

router.post('/order', verifyToken, async (req, res) => {
    try {
        const instance = new RazorPay({
            key_id: process.env.key_id,
            key_secret: process.env.key_secret
        })

        const options = {
            amount: req.body.amount *100 ,
            currency: 'INR',
            receipt: crypto.randomBytes(10).toString('hex')
        }

        instance.orders.create(options, (err, order) => {
            if (err) {
                console.log(err)
                res.status(500).json({ msg: 'Something went wrong' })
            }
            res.status(200).json({ data: order })

        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Internal server error!' })
    }
})


// payment verify
router.post('/verify', verifyToken, async (req, res) => {
    try {

        const { razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature } = req.body
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHash('sha256', process.env.key_secret)
            .update(sign.toString())
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
