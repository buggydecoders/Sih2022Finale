const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const User = require('../models/User')

const checkAuth = async (req, res, next) => {
    try {
        const token = req.header("auth") || req.cookies.auth
        if (!token) {
            res.status(401).json({ success: false, message: "Unauthorised" })
        }
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        const user = await User.findById(data.user.id)
        if (user.isBan) {
            res.status(403).json({ success: false, message: "You are Banned" })
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
    }
}

module.exports = checkAuth