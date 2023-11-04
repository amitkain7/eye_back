const router = require('express').Router()
const {getAllCategory, getCategoryItem , createCategory } = require('../controllers/category')
const {verifyTokenAndAdmin} = require('../middleware/authentication')

router.post('/' ,verifyTokenAndAdmin , createCategory)
router.get('/' , getAllCategory)
router.get('/:category' , getCategoryItem)

module.exports = router