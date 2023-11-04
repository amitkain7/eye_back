const router = require('express').Router()

const { Register , login} = require('../controllers/auth')


router.post('/register' , Register)
router.post('/login' , login)


module.exports = router