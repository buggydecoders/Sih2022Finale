const Requirements = require('../models/Requirements')
const catchAsync = require('../utils/catchAsync')

exports.createRequirement = catchAsync(async (req, res, next) => {
    const { name, type, description, budget, durationFrom, durationTo, isFeatured } = req.body
    const newRequirement = new Requirements({
        name,
        type,
        description,
        budget,
        durationFrom,
        durationTo,
        isFeatured
    })
    const addedRequirement = await newRequirement.save()
    res.json({ success: true, requirement: addedRequirement })
})

exports.getRequirements = catchAsync(async (req, res, next) => {
    const { type, isFeatured } = req.query;
    let queryObject = {}
    if (type) queryObject.type = type
    if (isFeatured) queryObject.isFeatured = isFeatured
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    let skipIndex = (page - 1) * limit;

    let totalDocuments = await Requirements.countDocuments(queryObject)
    let totalPages = Math.ceil(totalDocuments / limit);

    const requirement = await Requirements.find(queryObject)
        .limit(limit)
        .skip(skipIndex)
        .exec();

    res.json({ success: true, requirement, totalPages, page, limit })
})