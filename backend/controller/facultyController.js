const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.signupFaculty = catchAsync(async (req, res, next) => {
    const { name, dob, resume, aadharNumber, interest, email, password, address } = req.body
    const checkMail = await User.find({ email })
    if (checkMail.length != 0) {
        return next(
            new AppError('Email Already Exists', 400)
        )
    }
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);
    const newUser = new User({
        name,
        dob,
        aadharNumber,
        interest,
        role: "faculty",
        resume,
        email,
        password: hashPass,
        address
    })
    const user = await newUser.save();
    res.status(201).json({ success: true, message: "Succesfully Created", user });
})

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
    res.cookie('auth', authToken, {
        httpOnly: true,
    })
    res.status(200).json({ success, user: user.faculty });
})

exports.addRequirement = catchAsync(async (req, res, next) => {

})

exports.getRequirements = catchAsync(async (req, res, next) => {

})