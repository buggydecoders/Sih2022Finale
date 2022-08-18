const Resource = require('../models/Resource');
const SavedItem = require('../models/SavedResource');
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync');
const updateReputationPoint = require('../utils/reputation');
const axios = require('axios')
const FormData = require('form-data');
const User = require('../models/User');

exports.addResource = catchAsync(async (req, res, next) => {
    const { name, price, durationFrom, durationTo, category, brief, description, per, condition, instruction, images } = req.body
    const newRes = new Resource({
        images,
        name,
        price,
        durationFrom,
        durationTo,
        category,
        per,
        brief,
        description,
        condition,
        instruction,
        instituteId: req.user.id
    })
    const resource = await newRes.save()
    res.json({ success: true, message: "Resource Added Successfully", resource })
})

exports.getMyResource = catchAsync(async (req, res, next) => {
    let queryObject = { instituteId: req.user.id }
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
    const resource = await Resource.findById(req.params.id).populate('instituteId');
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






exports.addSavedItem = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const foundUser = await User.findById(req.user.id).populate('savedItems');
    console.log(foundUser);
    let foundResource = await Resource.findById(id);
    if (!foundResource) return next(new AppError(`Resource with id ${id} was not found`, 404));
    let savedItemIds = [];
    if (foundUser.savedItems) {
        savedItemIds = foundUser.savedItems.map(item => item.id);
        console.log(savedItemIds)
    }
    if (savedItemIds.includes(id)) {
        return res.json({
            status: false,
            resource: foundResource,
        })
    }
    foundUser.savedItems.push(foundResource);
    let updatedUser = await foundUser.save();
    res.json({
        resource: foundResource,
        status: true,

    })
})

exports.deleteSavedItem = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    // console.log(id);
    const foundUser = await User.findById(req.user.id).populate('savedItems');
    let foundResource = await Resource.findById(id);
    if (!foundResource) return next(new AppError('Something went wrong!', 404));
    let savedItemIds = [];
    if (foundUser.savedItems) {
        savedItemIds = foundUser.savedItems.map(item => item.id);
    }
    if (!savedItemIds.includes(id)) {
        return res.json({
            status: false,
            resource: foundResource,
        })
    }
    foundUser.savedItems = foundUser.savedItems.filter(s => s.id !== id);
    // console.log(foundUser.savedItems[0].id);
    let updatedUser = await foundUser.save();
    res.json({
        resource: foundResource,
        status: true,

    })
})

exports.recommendedResources = catchAsync(async (req, res, next) => {
    // let queryObject = {}
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 10;

    // let bodyFormData = new FormData()
    // bodyFormData.append('id', req.user.id)
    // let { data } = await axios({
    //     method: "post",
    //     url: "http://127.0.0.1:5001/recommendation",
    //     data: bodyFormData,
    //     headers: { "Content-Type": "multipart/form-data" },
    // })
    // console.log(data[0].$oid)
    // let resources = []
    // for (let i = 0; i < data.length; i++) {
    //     queryObject.id = data[i].$oid
    //     const resource = await Resource.findOne(queryObject).populate('instituteId')
    //     if (resource && resource.instituteId.id != req.user.id) resources.append(resource)
    // }
    // let startIndex = (page - 1) * limit;
    // let endIndex = startIndex + limit;
    // let totalDocuments = resources.length
    // let totalPages = Math.ceil(totalDocuments / limit);
    // resources = resources.slice(startIndex, endIndex)
    // res.json({ success: true, resources, totalPages, page, limit })


    //TESTING DATA
    let queryObject = {}
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const resource = await Resource.find(queryObject).populate('instituteId')
    let resources = []
    resources = resource.filter(p => p.instituteId.id != req.user.id)
    let startIndex = (page - 1) * limit;
    let endIndex = startIndex + limit;
    let totalDocuments = resources.length
    let totalPages = Math.ceil(totalDocuments / limit);
    resources = resources.slice(startIndex, endIndex)
    res.json({ success: true, resources, totalPages, page, limit })
})

exports.searchResource = catchAsync(async (req, res, next) => {
    let queryObject = {}
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let bodyFormData = new FormData()
    bodyFormData.append('id', req.user.id)
    bodyFormData.append('title', req.body.name)

    let { data } = await axios({
        method: "post",
        url: "http://127.0.0.1:5001/recommendation/search",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
    })
    console.log(data[0].$oid)
    let resources = []
    for (let i = 0; i < data.length; i++) {
        queryObject.id = data[i].$oid
        const resource = await Resource.findOne(queryObject).populate('instituteId')
        if (resource && resource.instituteId.id != req.user.id) resources.append(resource)
    }
    let startIndex = (page - 1) * limit;
    let endIndex = startIndex + limit;
    let totalDocuments = resources.length
    let totalPages = Math.ceil(totalDocuments / limit);
    resources = resources.slice(startIndex, endIndex)
    res.json({ success: true, resources, totalPages, page, limit })
})


