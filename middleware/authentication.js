const jwt = require('jsonwebtoken');
const customError = require('../errors/customerror');
const User = require('../models/user');

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
         
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            next(new customError('No token provided!', 400));
        }

        const token = authHeader.split(' ')[1];

        const data = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(data.id).select('role');

        req.user = { userId: data.id, role: user.role };
        next();
    } catch (error) {
        next(new customError('You are not authorized', 401));
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    // console.log(req.user.userId , req.params.id)
    if (req.user.userId === req.params.id || req.user.role === 'admin') {
        next();
    } else {
        next(new customError('You are Not allowed to do that', 403));
    }
};

const verifyTokenAndAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        next(new customError('You are not allowed to do that', 403));
    }
};

module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
};
