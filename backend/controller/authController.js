const User = require('../models/User')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const { sendEmail } = require('../utils/sendEmail')
const createToken = require('../utils/createToken')
const bcrypt = require('bcrypt');

exports.forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return next(
            new AppError("User Doesn't Exist", 404)
        )
    }
    const token = createToken(user.id);
    sendEmail(email, { token })
    user.resetToken = token;
    await user.save();
    res.json({ success: true })
})

exports.resetPassword = catchAsync(async (req, res, next) => {
    const { newPass, resetToken } = req.body;
    const user = await User.findOne({ resetToken });
    if (!user) {
        return next(
            new AppError("Invalid Reset Token Provided", 403)
        )
    }
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(newPass, salt);
    user.password = hashPass;
    await user.save();
    res.json({ success: true, message: "Password Changed Succesfully" })
})