const jwt = require('jsonwebtoken')

const createToken = (userid) => {
    const data = {
        user: {
            id: userid
        }
    }
    const authToken = jwt.sign(data, process.env.JWT_SECRET)
    return authToken
}

module.exports = createToken
