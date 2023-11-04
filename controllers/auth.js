const User = require('../models/user')
const customError = require('../errors/customerror')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Register = async (req, res, next) => {
  try {


    const { username, email, password } = req.body
    if (!username || !email || !password) {
      throw new customError('please provide username , email or password', 400)
    }
   
    // make first user admin
    const isFirstAccount = (await User.countDocuments({})) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    // hashpassword
    const salt = await bcryptjs.genSalt(10)
    const hashpassword = await bcryptjs.hash(password, salt)

    const user = await User.create({
      username: username,
      email: email,
      password: hashpassword,
      role: role
    })
    // console.log(user)
    res.status(201).json({ msg: "successful", user: user.username })
  }
  catch (error) {
    next(error)
  }

}


const login = async (req, res, next) => {
  try {


    const { email, password } = req.body
    if (!email || !password) {
      throw new customError('please provide email and password', 400)
    }

    const user = await User.findOne({ email: email })
    if (!user) {
      throw new customError(`no user availble with following email ${email}`, 400)
    }

    //  compare password
    const isPasswordCorrect = await bcryptjs.compare(password, user.password)
    if (!isPasswordCorrect) {
      throw new customError(`worng passowrd`, 401)
    }

    // create token 
    const { _id: id, username: username } = user

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.status(200).json({ user: user.username, email : user.email, token: token })
  } catch (error) {
   
    next(error)
  }

}


module.exports = {
  Register,
  login
}