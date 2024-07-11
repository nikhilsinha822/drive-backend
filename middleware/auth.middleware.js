const User = require('../models/user.model')
const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    try {
        const authUser = req?.cookies?.jwt

        if (!authUser || !authUser.startsWith('Bearer '))
            return res.status(403).json({ message: "Access Denied" })

        const token = authUser.split(' ')[1]

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findOne({ username: decoded?.username }).select('-password').lean().exec()

        if(!decoded.username || !user)
            return res.status(403).json({ message: "Access Denied" })

        req.user = user
        next()
    } catch (err) {
        console.log(err)
        return res.json({ message: "Internal Server Error" })
    }
}

module.exports = {
    validateToken
}