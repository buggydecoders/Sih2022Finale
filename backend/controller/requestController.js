const Request = require('../models/Request');
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.createRequest = catchAsync(async (req, res, next) => {
    const { lendingInstitute, aspirantInstitute, endDate, startDate, notes, reqType, status } = req.body;
    const checkReq = await Request.findOne({ resource: req.params.id, aspirantInstitute: req.user.id, isActive: true })
    if (checkReq) {
        return res.json({ state: false, message: "Request exist Already", request: checkReq })
    }
    const request = new Request({
        lendingInstitute, aspirantInstitute, endDate, startDate, notes, reqType, status
    })
    const addedRequest = await request.save()
    res.json({ success: true, message: "Request Added Successfully", request: addedRequest })
})

exports.getRequest = catchAsync(async (req, res, next) => {
    const checkReq = await Request.findOne({ resource: req.params.id, aspirantInstitute: req.user.id, isActive: true })
    if (checkReq) {
        return res.json({ state: true, message: "Request exist Already", request: checkReq })
    }
    return res.json({state: false, message: "Request Does not exists."})
})