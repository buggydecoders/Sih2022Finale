const Contracts = require('../models/Contract')
const catchAsync = require('../utils/catchAsync')

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

exports.getContract = catchAsync(async (req, res, next) => {
    let queryObject = { createdBy: req.user.id }
    const contracts = await Contracts.find(queryObject)
    res.json({ success: true, contracts })
})