const Request = require('../models/Request');
const Resource = require('../models/Resource');
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

exports.createRequest = catchAsync(async (req, res, next) => {
   const {resourceId,startDate,endDate,note} = req.body;
   const foundResource = await Resource.findById(resourceId).populate('instituteId');
   if (!foundResource) return next(new AppError(`Resource with id ${resourceId} was not found!`, 404));
   const isRequest = await Request.findOne({aspirantInstitute : req.user.id, isActive : true,resource : resourceId});
   if (isRequest) return next(new AppError(`You already have a request ongoing for the same resource`, 406));
   let newRequest = new Request({
    resource : resourceId,
    aspirantInstitute : req.user.id,
    lendingInstitute : foundResource.instituteId._id,
    startDate,
    endDate,
    note
   })
   newRequest = await newRequest.save();

   res.json({
    status : true,
    message : `Request for resource ${resourceId} has been created successfully!`,
    request : newRequest
   })
})

exports.requestExists = catchAsync(async (req, res, next) => {
    const foundReq = await Request.findOne({resource : req.params.id,aspirantInstitute : req.user.id, isActive : true});
    if (foundReq) {
        return res.json({
            status : true,message : 'Request exists',  request : foundReq
        })
    }
    else return res.json({
        status : false, message : "Request doesn't exists"
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