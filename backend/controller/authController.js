const User = require('../models/User')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const { sendEmail } = require('../utils/sendEmail')
const createToken = require('../utils/createToken')
const bcrypt = require('bcrypt');
const aishe = require('../utils/aishe.json')

exports.loginUser = catchAsync(async (req, res, next) => {
    let success = false;
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return next(
            new AppError('User Not Exists', 404)
        )
    }
    const passCompare = await bcrypt.compare(password, user.password)
    if (!passCompare) {
        return next(
            new AppError('Try Logging In with Correct Credentials', 404)
        )
    }
    success = true;
    const authToken = createToken(user.id)
    res.cookie('auth', authToken)
    res.status(200).json({ success, user });
})

exports.createUser = catchAsync(async (req, res, next) => {
    const { email, password, aisheCode } = req.body;
    const checkMail = await User.find({ email })
    if (checkMail.length != 0) {
        return next(
            new AppError('Email Already Exists', 400)
        )
    }
    if (!(email && password)) {
        return next(
            new AppError('Please Provide Email and Password')
        )
    }
    let isAishe = false
    let instituteName = ""
    let state = ""
    let street = ""
    let city = ""
    for (let i = 0; i < aishe.length; i++) {
        if (aishe[i].aishe_id === aisheCode) {
            isAishe = true;
            instituteName = aishe[i].hei_name
            state = aishe[i].state_name
            city = aishe[i].other_address.split(",")[1]
            street = aishe[i].other_address.split(",").slice(2).toString()
            naac = aishe[i].naac_grade
        }
    }
    if (!isAishe) return next(new AppError('Invalid Aishe Code Entered', 403))
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);
    const newUser = new User({
        instituteName,
        email,
        aisheCode,
        password: hashPass,
        naac,
        address: {
            street,
            city,
            state
        }
    })
    const user = await newUser.save();
    res.status(201).json({ success: true, message: "Succesfully Created", user });
})

exports.logoutUser = catchAsync((req, res, next) => {
    res.clearCookie('auth')
    res.json({ success: true, message: 'Logging Out' })
})

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) {
        return next(
            new AppError('User Not Found')
        )
    }
    res.json({ success: true, user })
})

exports.removeUser = catchAsync(async (req, res, next) => {
    const removedUser = await User.findByIdAndRemove(req.params.id)
    if (!removedUser) {
        return next(
            new AppError('Invalid User Id Provided')
        )
    }
    res.json({ success: true, message: "User removed Succesfully", removedUser })
})

exports.updateUser = catchAsync(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedUser) {
        return next(
            new AppError('Invalid User Id Provided')
        )
    }
    res.json({ success: true, message: "User Updated Succesfully", updatedUser })
})

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