const Request = require('../models/Request');
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

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