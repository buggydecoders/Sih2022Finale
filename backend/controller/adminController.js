const Request = require("../models/Request");
const Requirement = require("../models/Requirements");
const Resource = require("../models/Resource");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.getAllInstitutes = catchAsync(async (req, res, next) => {
    const institutes = await User.find();
    res.json({ success: true, institutes })
})

exports.getStats = catchAsync(async (req, res, next) => {
    const institute = await User.find({ role: institute })
    const resources = await Resource.find()
    const request = await Request.find()
    const requirement = await Requirement.find()
    
    res.json({ success: true, totalInstitutes: institute.length, totalResources: resources.length, totalRequest: request.length, totalRequirement: requirement.length })
})

exports.getRequirements = catchAsync(async (req, res, next) => {
    const requirements = await Requirement.find().populate('aspirantInstitute')
    res.json({ success: true, requirements })
})