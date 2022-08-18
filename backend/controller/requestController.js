const Request = require('../models/Request');
const User = require('../models/User');
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const axios = require('axios')
const FormData = require('form-data');

exports.createRequest = catchAsync(async (req, res, next) => {
    const { lendingInstitute, aspirantInstitute, endDate, startDate, notes, reqType, status } = req.body;
    const checkReq = await Request.findOne({ resource: req.params.id, aspirantInstitute: req.user.id, isActive: true }).populate('aspirantInstitute').populate('lendingInstitute').populate('resource')
    if (checkReq) {
        return next(
            new AppError('Request Already Exists.', 403)
        )
    }
    const request = new Request({
        lendingInstitute, aspirantInstitute, endDate, startDate, notes, reqType, status
    })
    const addedRequest = await request.save()
    res.json({ success: true, message: "Request Added Successfully", request: addedRequest })
})

exports.getRequest = catchAsync(async (req, res, next) => {
    const checkReq = await Request.findOne({ id: req.params.id, isActive: true }).populate('aspirantInstitute').populate('lendingInstitute').populate('resource')
    if (checkReq) {
        return res.json({ state: true, message: "Request exist Already", request: checkReq })
    }
    return res.json({ state: false, message: "Request Does not exists." })
})

exports.getAllRequest = catchAsync(async (req, res, next) => {
    let queryObject = { aspirantInstitute: req.user.id }
    const { isActive, status } = req.query;
    if (isActive) queryObject.isActive = isActive
    if (status) queryObject.status = status
    const requests = await Request.find(queryObject).populate('aspirantInstitute').populate('lendingInstitute').populate('resource')
    res.json({ success: true, requests })
})

exports.updateRequest = catchAsync(async (req, res, next) => {
    const request = await Request.findOne({ id: req.params.id, lendingInstitute: req.user.id })
    if (!request) {
        return next(
            new AppError(`Resource with ${id} not found or you are not allowed to update the request.`, 404)
        )
    }
    const updatedRequest = await Request.findByIdAndUpdate(request.id, req.body, { new: true })
    res.json({ success: true, updatedRequest })
})

exports.getRecievedRequest = catchAsync(async (req, res, next) => {
    let queryObject = {
        lendingInstitute: req.user.id
    }
    const requests = await Request.find(queryObject)
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