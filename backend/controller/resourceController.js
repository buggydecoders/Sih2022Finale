const Resource = require('../models/Resource');
const SavedItem = require('../models/SavedResource');
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const Cloudinary = require('../utils/cloudinary')

exports.addResource = catchAsync(async (req, res, next) => {
    const { name, price, duration, category, brief, description, condition, instruction } = req.body;
    const result = await Cloudinary.uploader.upload(req.file.path);
    const url = result.secure_url;
    const newRes = new Resource({
        imageUrl: url,
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
    await newRes.save()
    res.json({ success: true, message: "Resource Added Successfully" })
})

exports.getResource = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;

    const resources = await Resource.find()
        .limit(limit)
        .skip(skipIndex)
        .exec();

    res.json({ success: true, resources })
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