const Request = require('../models/Request');
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.createRequest = catchAsync(async (req, res, next) => {
    const { note, startDate, endDate } = req.body;
    const request = new Request({
        note,
        instituteId: req.user.id,
        startDate,
        endDate
    })
    const addedRequest = await request.save()
    res.json({ success: true, message: "Request Added Successfully", request: addedRequest })
})

exports.getRequest = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;
    const requests = await Request.find()
        .limit(limit)
        .skip(skipIndex)
        .exec();
        
    res.json({ success: true, requests })
})