const Request = require("../models/Request");
const Requirement = require("../models/Requirements");
const Resource = require("../models/Resource");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.getAllInstitutes = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let totalDocuments = await User.countDocuments({ role: "institute" })
    let totalPages = Math.ceil(totalDocuments / limit);
    let skipIndex = (page - 1) * limit;
    const institutes = await User.find({ role: "institute" })
        .limit(limit)
        .skip(skipIndex)
        .exec();
    res.json({ success: true, institutes, totalPages, page, limit })
})

exports.getAllResources = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let totalDocuments = await Resource.countDocuments()
    let totalPages = Math.ceil(totalDocuments / limit);
    let skipIndex = (page - 1) * limit;

    const resources = await Resource.find()
        .limit(limit)
        .skip(skipIndex)
        .exec();
    res.json({ success: true, resources, totalPages, page, limit })
})

exports.getAllRequests = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let totalDocuments = await Resource.countDocuments()
    let totalPages = Math.ceil(totalDocuments / limit);
    let skipIndex = (page - 1) * limit;

    const requests = await Request.find()
        .limit(limit)
        .skip(skipIndex)
        .exec();
    res.json({ success: true, requests, totalPages, page, limit })
})

exports.getAllRequirements = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let totalDocuments = await Resource.countDocuments()
    let totalPages = Math.ceil(totalDocuments / limit);
    let skipIndex = (page - 1) * limit;

    const requirements = await Requirement.find()
        .limit(limit)
        .skip(skipIndex)
        .exec();

    res.json({ success: true, requirements, totalPages, page, limit })
})

exports.getStats = catchAsync(async (req, res, next) => {
    const institutesCount = await User.countDocuments({ role: "institute" })
    const resourcesCount = await Resource.countDocuments()
    const requestCount = await Request.countDocuments({ status: "apporoved" })
    const requirementCount = await Requirement.countDocuments()
    res.json({ success: true, institutesCount, resourcesCount, requestCount, requirementCount })
})