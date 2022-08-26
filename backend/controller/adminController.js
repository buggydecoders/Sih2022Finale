const Request = require("../models/Request");
const Requirement = require("../models/Requirements");
const Resource = require("../models/Resource");
const Coupon = require("../models/Coupon");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.getAllInstitutes = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let totalDocuments = await User.countDocuments({ role: "institute" })
    let totalPages = Math.ceil(totalDocuments / limit);
    let skipIndex = (page - 1) * limit;
    let institutes = await User.find({ role: "institute" })
        .limit(limit)
        .skip(skipIndex)
        .exec();
    let sentInsList = [];
    for (let i = 0; i < institutes.length; i++) {
        // console.log(institutes[i].id)

        // console.log(resourceCount)


        let sharedCount = await Request.countDocuments({ lendingInstitute: institutes[i].id, status: 'completed' });
        let resourceCount = await Resource.countDocuments({ instituteId: institutes[i].id });
        let jsonI = JSON.parse(JSON.stringify(institutes[i]));
        let insSent = { ...jsonI, sharedCount, resourceCount }
        sentInsList.push(insSent);
        // console.log(institutes[i].resourcesCount, institutes[i].sharedCount)
    }

    res.json({ success: true, institutes: sentInsList, totalPages, page, limit })
})

exports.getAllResources = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let totalDocuments = await Resource.countDocuments()
    let totalPages = Math.ceil(totalDocuments / limit);
    let skipIndex = (page - 1) * limit;

    const resources = await Resource.find()
        .populate('instituteId')
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
        .populate("lendingInstitute")
        .populate("aspirantInstitute")
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

exports.addCoupon = catchAsync(async (req, res, next) => {
    const { resourceId, discount, code } = req.body
    const coupon = new Coupon({
        resource: resourceId,
        discount,
        code
    })
    const createdCoupon = await coupon.save()
    res.json({ success: true, createdCoupon })
})

exports.getCoupon = catchAsync(async (req, res, next) => {
    const coupons = await Coupon.find()
    res.json({ success: true, coupons })
})