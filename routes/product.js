const router = require('express').Router()

const {createProduct, deleteProduct , getAllproduct , getProduct } = require('../controllers/product')
const { verifyTokenAndAdmin } = require('../middleware/authentication')

router.route('/').get(getAllproduct)
router.route('/').post(verifyTokenAndAdmin , createProduct)
router.route('/:id').get(getProduct)
router.route('/:id').delete(verifyTokenAndAdmin , deleteProduct)

module.exports = router