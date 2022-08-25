const User = require('../models/User')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const { sendEmail } = require('../utils/sendEmail')
const createToken = require('../utils/createToken')
const bcrypt = require('bcrypt');
const aishe = require('../utils/aishe.json')
const SavedItem = require('../models/SavedResource')
const updateReputationPoint = require('../utils/reputation')
var slugify = require('slugify')
const Resource = require('../models/Resource')

exports.loginUser = catchAsync(async (req, res, next) => {
    let success = false;
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("savedItems");
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
    res.cookie('auth', authToken, {
        httpOnly: true,
    })
    res.status(200).json({ success, user });
})

exports.createUser = catchAsync(async (req, res, next) => {
    const { email, password, aisheCode } = req.body;
    const checkMail = await User.find({ email })
    const checkAishe = await User.find({ aisheCode })
    if (checkMail.length != 0) {
        return next(
            new AppError('Email Already Exists', 400)
        )
    }
    if (checkAishe.length != 0) {
        return next(
            new AppError('Aishe Code Already Exists', 400)
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
    let pincode = ''
    for (let i = 0; i < aishe.length; i++) {
        if (aishe[i].aishe_id === aisheCode) {
            isAishe = true;
            instituteName = aishe[i].hei_name
            state = aishe[i].state_name
            city = aishe[i].other_address.split(",")[1]
            street = aishe[i].other_address.split(",").slice(3).toString()
            pincode = aishe[i].other_address.split(",")[2]
            naac = aishe[i].naac_grade
        }
    }
    if (!isAishe) return next(new AppError('Invalid Aishe Code Entered', 403))
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);
    const newUser = new User({
        instituteName,
        email,
        username: slugify(instituteName, {
            replacement: '-',
            remove: undefined,
            lower: true,
            strict: true,
            locale: 'vi',
            trim: true
        }),
        aisheCode,
        password: hashPass,
        naac,
        address: {
            street,
            city,
            pincode,
            state
        }
    })
    const user = await newUser.save();
    const updatedUser = await updateReputationPoint(user.id, "")
    const saveItem = new SavedItem({
        user: user.id
    })
    await saveItem.save()
    res.status(201).json({ success: true, message: "Succesfully Created", user: updatedUser });
})

exports.logoutUser = catchAsync((req, res, next) => {
    res.clearCookie('auth')
    res.json({ success: true, message: 'Logging Out' })
})

exports.getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("-password").populate("savedItems");
    if (!user) {
        return next(
            new AppError('User Not Found', 401)
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
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true })
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


exports.setVerification = catchAsync(async (req, res, next) => {
    const { agreementContractAddress, walletAddress } = req.body;
    let user = await User.findById(req.user.id)
    if (!user) {
        return next(
            new AppError('Invalid Id Provided', 404)
        )
    }
    user.agreementContractAddress = agreementContractAddress;
    user.walletAddress = walletAddress;
    user.isVerified = true;

    const updatedUser = await user.save()

    res.json({ success: true, user: updatedUser })
})



exports.getAllInstitutes = catchAsync(async (req, res, next) => {
    const institutes = await User.find({}).select({ instituteName: 1 })
    res.json({ succcess: true, institutes })
})

exports.getInstituteBySlug = catchAsync(async (req, res, next) => {
    const { slug } = req.params;
    const institute = await User.findOne({ username: slug })
    if (!institute) {
        return next(
            new AppError('Institute Not Found', 404)
        )
    }
    res.json({ success: true, institute })
})

exports.getInstituteResource = catchAsync(async (req, res, next) => {
    let queryObject = { instituteId: req.params.id }
    let { state, category } = req.query;

    if (state && state === 'all') state = '';
    if (category && category === 'all') category = '';


    if (state) queryObject.state = req.query.state
    if (category) queryObject.category = req.query.category

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let totalDocuments = await Resource.countDocuments(queryObject)
    let totalPages = Math.ceil(totalDocuments / limit);

    const skipIndex = (page - 1) * limit;
    const resources = await Resource.find(queryObject)
        .limit(limit)
        .skip(skipIndex)
        .exec();

    res.json({ success: true, resources, totalPages, page, limit, state: state || 'all', category: category || 'all' })
})
// exports.usernameScript = catchAsync(async (req, res, next) => {
//     const user = await User.find();
//     for (let i = 0; i < user.length; i++) {
// user[i].username = slugify(user[i].instituteName, {
//     replacement: '-',
//     remove: undefined,
//     lower: true,
//     strict: true,
//     locale: 'vi',
//     trim: true
// })
//         await user[i].save()
//     }
//     res.json({ success: true })
// })