const User = require('../models/User')
var FormData = require('form-data');
const axios = require('axios')

const updateReputationPoint = async (id, feedback) => {
    const institute = await User.findById(id)
    let naac = 0
    let repo = 0
    switch (institute.naac) {
        case 'A++': naac = 100
            break;
        case 'A+': naac = 87.5
            break;
        case 'A': naac = 75
            break;
        case 'B++': naac = 62.5
            break;
        case 'B+': naac = 50
            break;
        case 'B': naac = 37.5
            break;
        case 'C': naac = 25
            break;
        case 'D': naac = 12.5
            break;
    }
    if (feedback) {
        let bodyFormData = new FormData()
        bodyFormData.append('feedback', feedback)
        let sa = await axios({
            method: "post",
            url: "https://flask-sih.herokuapp.com/sentiments",
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
        saScore = sa.data
        repo = (0.4 * naac + 0.6 * saScore) * 0.1
        repo = (parseInt(institute.reputationPoint) + repo) / 2
        institute.reputationPoint = repo
    }
    else {
        repo = (naac) * 0.08
        institute.reputationPoint = repo
    }
    updatedData = await institute.save()
    return updatedData
}

module.exports = updateReputationPoint