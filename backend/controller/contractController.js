const Contracts = require('../models/Contract')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

exports.addContract = catchAsync(async (req, res, next) => {
    const { title, terms, validTill } = req.body
    const newContract = new Contracts({
        title,
        terms,
        validTill,
        createdBy: req.user.id
    })
    const addedContract = await newContract.save()
    res.json({ success: true, contract: addedContract })
})

exports.getAllContract = catchAsync(async (req, res, next) => {
    let queryObject = { createdBy: req.user.id }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let totalDocuments = await Contracts.countDocuments(queryObject)
    let totalPages = Math.ceil(totalDocuments / limit);
    let skipIndex = (page - 1) * limit;

    const contracts = await Contracts.find(queryObject)
        .populate('createdBy')
        .limit(limit)
        .skip(skipIndex)
        .exec();

        console.log(contracts);
    res.json({ success: true, contracts, totalPages, page, limit })
})

exports.getContract = catchAsync(async (req, res, next) => {
    const contract = await Contracts.findById(req.params.id).populate('createdBy')
    if (!contract) {
        return next(
            new AppError(`No Contract Found with id ${id}`, 404)
        )
    }
    res.json({ success: true, contract })
})

exports.updateContract = catchAsync(async (req, res, next) => {
    const contract = await Contracts.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!contract) {
        return next(
            new AppError(`No Contract Found with id ${id}`, 404)
        )
    }
    res.json({ success: true, contract })
})

exports.deleteContract = catchAsync(async (req, res, next) => {
    const contract = await Contracts.findByIdAndRemove(req.params.id)
    if (!contract) {
        return next(
            new AppError(`No Contract Found with id ${id}`, 404)
        )
    }
    res.json({ success: true, contract })
})