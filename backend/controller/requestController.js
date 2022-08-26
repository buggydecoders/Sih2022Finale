const Request = require('../models/Request');
const Resource = require('../models/Resource');
const User = require('../models/User');
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const axios = require('axios')
const FormData = require('form-data');
const generateUniqueId = require("generate-unique-id");
const imageToBase64 = require('image-to-base64');
const moment = require('moment')
const { storeTokenUriMetaData } = require("../utils/pinataSDK");
const { sign, verify } = require('jsonwebtoken');


const returnTemplate = (request, URI, expired) => {
    const duration = moment(request.endDate).diff(request.startDate, 'days');
    const metaDataTemplate = {
        name: request.contract.title,
        description: request.contract.terms,
        image: URI,
        attributes: [{
            "Request ID": request.id,
            "lending Institute": request.lendingInstitute.instituteName,
            "Aspirant Institute": request.aspirantInstitute.instituteName,
            "Duration": `${duration} Days`,
        }]
    }
    return metaDataTemplate;
}




// PINATA 
const getPinataURIs = async (id) => {
    const request = await Request.findById(id).populate('lendingInstitute').populate('contract').populate('aspirantInstitute')
    let base64Active = imageToBase64(request.lendingInstitute.logo);

    const activeTemplate = returnTemplate(request, base64Active);
    const pinataURIActive = await storeTokenUriMetaData(activeTemplate);
    return `ipfs://${pinataURIActive.IpfsHash}`;

}


exports.createRequest = catchAsync(async (req, res, next) => {
    const { resourceId, startDate, endDate, note,accessType } = req.body;
    const foundResource = await Resource.findById(resourceId).populate('instituteId');
    if (!foundResource) return next(new AppError(`Resource with id ${resourceId} was not found!`, 404));
    const isRequest = await Request.findOne({ aspirantInstitute: req.user.id, isActive: true, resource: resourceId, status : {"$in" : ['pending','payment','signed','approved']} });
    if (isRequest) return next(new AppError(`You already have a request ongoing for the same resource`, 406));
    const token = sign({resourceId,accessType},'mysecret',{expiresIn : accessType==='duration'?moment(endDate).diff(moment(startDate),'minutes'):'3d'});
    let newRequest = new Request({
        _id: generateUniqueId({
            length: 10,
            useLetters: false,
        }),
        resource: resourceId,
        aspirantInstitute: req.user.id,
        lendingInstitute: foundResource.instituteId._id,
        startDate,
        endDate,
        accessToken : token,
        note,
        accessType
    })
    newRequest = await newRequest.save();

    res.json({
        status: true,
        message: `Request for resource ${resourceId} has been created successfully!`,
        request: newRequest
    })
});

exports.verifyRequestToken = catchAsync(async(req,res,next)=>{
    const {token} = req.body;
    console.log(token);
    const request = await Request.findOne({accessToken : token, isExpired : false});
    console.log(request,'DIDNT FIND')
    if (!request) return next(new AppError('Invalid Access Token',404));
    console.log('DIDNT MAKE IT')
    try {
        let decoded = verify(token,'mysecret');
        const resource = await Resource.findById(decoded.resourceId);
        if (decoded.accessType==='one-time') {
            request.isExpired = true;
            request.status = 'completed';
            await request.save();
        }
        return res.json({
            resourceURL : resource.resourceURL,
            resourceType : resource.resourceType
        });
    }catch(err) {
        console.log(err);
        return next(new AppError('Invalid Access Token',404));
    }
})

exports.requestExists = catchAsync(async (req, res, next) => {
    const foundReq = await Request.findOne({ resource: req.params.id, aspirantInstitute: req.user.id, isActive: true , status : {"$in" : ['pending','payment','signed','approved']}}).populate('resource');
    if (!foundReq || foundReq.resource.category==='virtual') return res.json({
        status : false,message :'Request doesnt exist'
    })
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
    const checkReq = await Request.findOne({ _id: req.params.id, isActive: true }).populate('aspirantInstitute').populate('lendingInstitute').populate('resource').populate('contract')
    if (checkReq) {
        return res.json({ state: true, message: "Request exist Already", request: checkReq })
    }
    return next(new AppError(`Request with id ${req.params.id} doesnt exists!`, 404))
})

exports.getAllRequest = catchAsync(async (req, res, next) => {
    let { isActive, status, type } = req.query;
    let queryObject = {}
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (isActive) queryObject.isActive = isActive
    if (status && status !== 'undefined') queryObject.status = status

    if (type === 'recieved') {
        queryObject.lendingInstitute = req.user.id
    }
    if (type === 'sent') {
        queryObject.aspirantInstitute = req.user.id
    }
    if (type === 'cancelled') {
        queryObject.lendingInstitute = req.user.id;
        queryObject.status = 'cancelled'
    }
    if (type === 'rejected') {
        queryObject.aspirantInstitute = req.user.id;
        queryObject.status = 'cancelled'
    }
    if (type === 'rejected') {
        queryObject.aspirantInstitute = req.user.id;
        queryObject.status = 'cancelled'
    }
    if (type === 'completed') {
        let request1 = await Request.find({ aspirantInstitute: req.user.id, status: 'completed' })
            .sort("-createdAt")
            .populate('aspirantInstitute')
            .populate('lendingInstitute')
            .populate('resource')
        let request2 = await Request.find({ lendingInstitute: req.user.id, status: 'completed' })
            .sort("-createdAt")
            .populate('aspirantInstitute')
            .populate('lendingInstitute')
            .populate('resource')
        let requests = request1.concat(request2)

        let startIndex = (page - 1) * limit;
        let endIndex = startIndex + limit;
        let totalDocuments = requests.length
        let totalPages = Math.ceil(totalDocuments / limit);
        requests = requests.slice(startIndex, endIndex)

        return res.json({ requests, totalPages, page, limit })

    }


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
    const request = await Request.findOne({ _id: req.params.id }).populate('aspirantInstitute').populate('lendingInstitute').populate('resource')
    if (!request) {
        return next(
            new AppError(`Resource with ${id} not found or you are not allowed to update the request.`, 404)
        )
    }
    let updatedRequest = await Request.findByIdAndUpdate(request.id, req.body, { new: true }).populate('aspirantInstitute').populate('lendingInstitute').populate('resource')
    if (Object.keys(req.body).includes("contract")) {
        let tokenURI = await getPinataURIs(request.id);
        updatedRequest = await Request.findByIdAndUpdate(request.id, { ipfsURI: tokenURI }, { new: true }).populate('aspirantInstitute').populate('lendingInstitute').populate('resource')
    }
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
    res.json({ success: true, updatedRequest })
})

exports.checkAccessKey = catchAsync(async (req, res, next) => {
    const { key } = req.body;
    const requests = await Request.find({ status: { '$ne': "completed" }, accessKeys: { '$in': [key] } })
    if (!requests) {
        return next(
            new AppError('Not Verified.', 403)
        )
    }
    res.json({ success: true, requests })
})