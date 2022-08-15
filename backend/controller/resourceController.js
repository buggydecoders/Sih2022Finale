const Resource = require('../models/Resource');
const SavedItem = require('../models/SavedResource');
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync');
const updateReputationPoint = require('../utils/reputation');

exports.addResource = catchAsync(async (req, res, next) => {
    const { name, price, duration, category, brief, description, condition, instruction, images } = req.body
    const newRes = new Resource({
        images,
        name,
        price,
        duration,
        category,
        brief,
        description,
        condition,
        instruction,
        instituteId: req.user.id
    })
    const resource = await newRes.save()
    res.json({ success: true, message: "Resource Added Successfully", resource })
})

exports.getResource = catchAsync(async (req, res, next) => {
    let queryObject = {}
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

exports.getResourceDetails = catchAsync(async (req, res, next) => {
    const resource = await Resource.findById(req.params.id)
    res.json({ success: true, resource })
})

exports.updateResource = catchAsync(async (req, res, next) => {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ success: true, updatedResource: resource })
})

exports.removeResource = catchAsync(async (req, res, next) => {
    const resource = await Resource.findByIdAndRemove(req.params.id)
    res.json({ success: true, resource })
})

exports.saveResource = catchAsync(async (req, res, next) => {
    const resource = await Resource.findById(req.params.id)
    const savedItem = await SavedItem.findOne({ user: req.user.id })
    savedItem.resource.push(resource.id)
    await savedItem.save()
    res.json({ success: true, message: "Resource Saved Successfully" })
})

exports.removeSavedResource = catchAsync(async (req, res, next) => {
    const savedItem = await SavedItem.findOne({ user: req.user.id })
    savedItem.resource = savedItem.resource.filter(p => p != req.params.id)
    await savedItem.save()
    res.json({ success: true, message: "Resource Removed Successfully" })
})

exports.getFeedback = catchAsync(async (req, res, next) => {
    const { feedback } = req.body;
    const updatedData = await updateReputationPoint(req.user.id, feedback)
    res.json({ updatedData })
})