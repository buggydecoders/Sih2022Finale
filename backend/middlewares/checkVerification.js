const jwt = require('jsonwebtoken')
const User = require('../models/User')

const checkVerification = async () => {
    try {
        const token = req.header("auth") || req.cookies.auth
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(data.user.id)
        if (user.isVerified) {
            next()
        }
        res.status(403).json({ success: false, message: "Verification Needed" })
    }
    catch (err) {
        res.status(403).json({ success: false, message: "Verification Needed!!" })
    }
}

module.exports = checkVerification;