const router = require('express').Router()
const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
} = require('../middleware/authentication')

const {
    saveToCart,
    deleteFromCart,
    updateCart,
    getCartItem,
    getCartItems
} = require('../controllers/cart')

router.post('/' ,verifyToken , saveToCart)
router.get('/:id',  verifyToken  , getCartItem)
router.patch('/:id', verifyToken , updateCart)
router.delete('/:id', verifyToken ,   deleteFromCart)
router.get('/' ,verifyToken  , getCartItems)

module.exports = router