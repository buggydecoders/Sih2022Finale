const Request = require('../models/Request');
const Resource = require('../models/Resource');
const User = require('../models/User');
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const axios = require('axios')
const FormData = require('form-data');

exports.createRequest = catchAsync(async (req, res, next) => {
    const { resourceId, startDate, endDate, note } = req.body;
    const foundResource = await Resource.findById(resourceId).populate('instituteId');
    if (!foundResource) return next(new AppError(`Resource with id ${resourceId} was not found!`, 404));
    const isRequest = await Request.findOne({ aspirantInstitute: req.user.id, isActive: true, resource: resourceId });
    if (isRequest) return next(new AppError(`You already have a request ongoing for the same resource`, 406));
    let newRequest = new Request({
        resource: resourceId,
        aspirantInstitute: req.user.id,
        lendingInstitute: foundResource.instituteId._id,
        startDate,
        endDate,
        note
    })
    newRequest = await newRequest.save();

    res.json({
        status: true,
        message: `Request for resource ${resourceId} has been created successfully!`,
        request: newRequest
    })
})

exports.requestExists = catchAsync(async (req, res, next) => {
    const foundReq = await Request.findOne({ resource: req.params.id, aspirantInstitute: req.user.id, isActive: true });
    if (foundReq) {
        return res.json({
            status: true, message: 'Request exists', request: foundReq
        })
    }
    else return res.json({
        status: false, message: "Request doesn't exists"
    })
});


exports.getRequest = catchAsync(async (req, res, next) => {
    const checkReq = await Request.findOne({ id: req.params.id, isActive: true }).populate('aspirantInstitute').populate('lendingInstitute').populate('resource')
    if (checkReq) {
        return res.json({ state: true, message: "Request exist Already", request: checkReq })
    }
    return next(new AppError(`Request with id ${req.params.id} doesnt exists!`, 404))
})

exports.getAllRequest = catchAsync(async (req, res, next) => {

    let queryObject = {}
    const { isActive, status, type } = req.query;
    if (isActive) queryObject.isActive = isActive
    if (status && status !== 'undefined') queryObject.status = status

    if (type === 'recieved') {
        queryObject.lendingInstitute = req.user.id
    }
    if (type === 'sent') {
        queryObject.aspirantInstitute = req.user.id
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let totalDocuments = await Request.countDocuments(queryObject)
    let totalPages = Math.ceil(totalDocuments / limit);
    let skipIndex = (page - 1) * limit;
    const requests = await Request.find(queryObject).sort("-createdAt")

        .populate('aspirantInstitute')
        .populate('lendingInstitute')
        .populate('resource')
        .limit(limit)
        .skip(skipIndex)
        .exec();


    res.json({ requests, totalPages, page, limit })

})


exports.updateRequest = catchAsync(async (req, res, next) => {
    const request = await Request.findOne({ id: req.params.id, lendingInstitute: req.user.id }).populate('aspirantInstitute').populate('lendingInstitute').populate('resource')
    if (!request) {
        return next(
            new AppError(`Resource with ${id} not found or you are not allowed to update the request.`, 404)
        )
    }
    const updatedRequest = await Request.findByIdAndUpdate(request.id, req.body, { new: true }).populate('aspirantInstitute').populate('lendingInstitute').populate('resource')
    res.json({ success: true, updatedRequest })
})

exports.getRecievedRequest = catchAsync(async (req, res, next) => {
    let queryObject = {
        lendingInstitute: req.user.id
    }
    const requests = await Request.find(queryObject).populate('aspirantInstitute').populate('lendingInstitute').populate('resource')
    res.json({ success: true, requests })
})

exports.checkSignature = catchAsync(async (req, res, next) => {
    const { signature } = req.body;
    const user = await User.findById(req.user.id)
    const verifiedSignature = user.contactPerson.signature
    let bodyFormData = new FormData()
    bodyFormData.append('image1', verifiedSignature)
    bodyFormData.append('image2', signature)
    let { data } = await axios({
        method: "post",
        url: "https://flask-sih.herokuapp.com/verify-signature",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
    })
    res.json({ isVerified: data })
})

exports.setMinting = catchAsync(async (req, res, next) => {
    const { tokenId } = req.body
    const request = await Request.findById(req.params.id)
    request.tokenId = tokenId;
    const updatedRequest = await request.save()
    res.json({success:true, updatedRequest })
})