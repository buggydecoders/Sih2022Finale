const Requirements = require('../models/Requirements')
const catchAsync = require('../utils/catchAsync')

exports.createRequirement = catchAsync(async (req, res, next) => {
    const { name, type, description, category, budget, durationFrom, durationTo, isFeatured } = req.body
    const newRequirement = new Requirements({
        name,
        type,
        description,
        category,
        budget,
        durationFrom,
        durationTo,
        aspirantInstitute: req.user.id,
        isFeatured
    })
    const addedRequirement = await newRequirement.save()
    res.json({ success: true, requirement: addedRequirement })
})

exports.getRequirements = catchAsync(async (req, res, next) => {
    const { type } = req.query;
    let queryObject = {}
    if (type === 'myrequest') queryObject.aspirantInstitute = req.user.id
    if (type === 'featured') queryObject.isFeatured = true

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    let skipIndex = (page - 1) * limit;
    console.log(queryObject)
    let totalDocuments = await Requirements.countDocuments(queryObject)
    let totalPages = Math.ceil(totalDocuments / limit);

    const requirement = await Requirements.find(queryObject)
        .populate('aspirantInstitute')
        .limit(limit)
        .skip(skipIndex)
        .exec();

    res.json({ success: true, requirement, totalPages, page, limit })
})


exports.getRequirement = catchAsync(async (req, res, next) => {
    const requirement = await Requirements.findById(req.params.id).populate('aspirantInstitute')

    res.json({ success: true, requirement })
})

exports.updateRequirement = catchAsync(async (req, res, next) => {
    const requirement = await Requirements.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('aspirantInstitute')

    res.json({ success: true, requirement })
})

exports.deleteRequirement = catchAsync(async (req, res, next) => {
    const requirement = await Requirements.findByIdAndRemove(req.params.id).populate('aspirantInstitute')

    res.json({ success: true, requirement })
})

exports.fulfillRequirement = catchAsync(async (req, res, next) => {

})