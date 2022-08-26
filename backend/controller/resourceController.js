const Resource = require('../models/Resource');
const SavedItem = require('../models/SavedResource');
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync');
const updateReputationPoint = require('../utils/reputation');
const axios = require('axios')
const FormData = require('form-data');
const User = require('../models/User');
const {cosine} = require('string-comparison');
exports.addResource = catchAsync(async (req, res, next) => {
    const { name,resourceURL,resourceType, price, durationFrom, durationTo, category, brief, description, per, condition, instruction, images } = req.body

    const newRes = new Resource({
        images,
        name,
        price,
        durationFrom,
        durationTo,
        resourceURL,
        resourceType,
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
});



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
        // console.log(savedItemIds)
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
    let updatedUser = await foundUser.save();
    res.json({
        resource: foundResource,
        status: true,

    })
})


exports.SearchData = catchAsync(async(req,res,next)=>{
    let resources = await Resource.find({}).populate('instituteId');
    let {key,page,limit} = req.query;
    console.log(key,page,limit)
    let tags = resources.map(r=>JSON.stringify(r));
    let sortedList = cosine.sortMatch(key,tags);
    sortedList = sortedList.reverse();
    let maxRating = 0;
    for (let i = 0; i < sortedList.length; ++i) {
        if (sortedList[i].rating > maxRating) maxRating = sortedList[i].rating;
      }
      let accuracy = maxRating - 0.2;
      let finalOptions = sortedList.filter((r) => r.rating >= accuracy);
      finalOptions = finalOptions.map(m=>(JSON.parse(m.member)));

  
    return res.json({
        resources : finalOptions,totalPages : 10,page,limit
    })

})

exports.fetchDashboardResources= catchAsync(async(req,res,next)=>{
    let { university: universityQuery, location: stateQuery, budget: budgetQuery, category,page,limit } = req.query;
    
    if (!universityQuery && !stateQuery && !category) {
        let totalDocs = await Resource.countDocuments();
        let resources =  await Resource.find({}).skip((parseInt(page)-1)*(parseInt(limit || 10))).limit(parseInt(limit || 10)).populate('instituteId');

        return res.json({totalPages : Math.ceil(totalDocs/parseInt(limit || 10)), resources,page,limit})
    }
    const universityFilters = universityQuery?universityQuery.split('-'):[];
    const location = stateQuery?stateQuery.split('-'):[];
    let queryObj = [{instituteId : {"$ne" : req.user.id}}];
    const institutes = await User.find({});
    let institutesInStates = institutes.filter(r=>location.includes(r.address.state)).map(d=>d.id);

    if (universityFilters.length>0) {
        queryObj.push({instituteId : {"$in" : universityFilters}})
    }
    if (location.length>0) {
        queryObj.push({instituteId : {"$in" : institutesInStates }})
    }
    if (category) {
        queryObj.push({category});
    }
    let totalDocs = await Resource.countDocuments({"$and" : queryObj})
    let totalPages = Math.ceil(totalDocs/parseInt(limit || 10));
    const filteredResources = await Resource.find({
        "$and" : queryObj
    }).skip((page-1)*(10)).limit(10).populate('instituteId');

    res.json({
        success: true, resources : filteredResources, totalPages, page, limit
    })
})

exports.recommendedResources = catchAsync(async (req, res, next) => {
    let { university: universityQuery, location: stateQuery, budget: budgetQuery, category: categoryQuery } = req.query;

    let queryObject = {}
    let resources = await Resource.find(queryObject).populate('instituteId')
    if (universityQuery && !stateQuery && !budgetQuery) {
        resources = resources.filter(p => {
            if (universityQuery.includes(p.instituteId.id)) {
                return p
            }
        })
    }
    if (!universityQuery && stateQuery && !budgetQuery) {
        resources = resources.filter(p => {
            if (stateQuery.includes(p.instituteId.address.state)) {
                return p
            }
        })
    }
    if (universityQuery && stateQuery && !budgetQuery) {
        resources = resources.filter(p => {
            if ((stateQuery.includes(p.instituteId.address.state)) && (universityQuery.includes(p.instituteId.id))) {
                return p
            }
        })
    }
    if (!universityQuery && !stateQuery && budgetQuery) {
        resources = resources.filter(p => {
            if (p.price > parseInt(budgetQuery[0]) && p.price < parseInt(budgetQuery[1])) {
                return p
            }
        })
    }
    if (universityQuery && stateQuery && budgetQuery) {
        console.log(universityQuery, stateQuery, budgetQuery)
        resources = resources.filter(p => {
            if ((stateQuery.includes(p.instituteId.address.state)) && (universityQuery.includes(p.instituteId.id)) && ((p.price > parseInt(budgetQuery[0]) && p.price < parseInt(budgetQuery[1])))) {
                return p
            }
        })
    }
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

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
    let startIndex = (page - 1) * limit;
    let endIndex = startIndex + limit;

    let bodyFormData = new FormData()
    bodyFormData.append('id', req.user.id)
    bodyFormData.append('title', req.body.name)
    bodyFormData.append('startIndex', startIndex)
    bodyFormData.append('endIndex', endIndex)

    let { data } = await axios({
        method: "post",
        url: "https://flask-sih.herokuapp.com/recommendation/search",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
    })
    let resources = []
    for (let i = 0; i < data.length; i++) {
        queryObject['_id'] = data[i].$oid
        // console.log(queryObject)
        const resource = await Resource.findOne(queryObject)
        // console.log(resource.instituteId.toString() != req.user.id)
        if (resource.instituteId.toString() != req.user.id) {
            const temp = await Resource.findOne({ _id: resource.id }).populate('instituteId')
            resources.push(temp)
        }
    }
    let totalDocuments = resources.length
    let totalPages = Math.ceil(totalDocuments / limit);
    resources = resources.slice(startIndex, endIndex)
    res.json({ success: true, resources, totalPages, page, limit })
})

exports.getFeedback = catchAsync(async (req, res, next) => {
    const { feedback } = req.body;
    if (!req.body.insId) {
        return next(
            new AppError('Please provide Institute Id to Continue', 403)
        )
    }
    const request = await Request.findById(req.params.id)
    let updatedData = ""
    if (req.user.id == request.lendingInstitute) {
        updatedData = updateReputationPoint(request.aspirantInstitute, feedback)
    }
    if (req.user.id == request.aspirantInstitute) {
        updatedData = updateReputationPoint(request.lendingInstitute, feedback)
    }
    res.json({ success: true, updatedData })
})