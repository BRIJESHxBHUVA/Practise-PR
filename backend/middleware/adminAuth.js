const Admin = require('../model/adminSchema')
const jwt = require('jsonwebtoken')

module.exports.checkAuth = async (req, res, next)=> {

    const token = req.header("Authorization").replace('Bearer ', '')

    if(!token){
        res.status(401).json({success: false, message: 'Access Denied. No token provided.'})
    }

    try {
        const verifiedToken = jwt.verify(token, 'admin')
        req.Admindata = await Admin.findById(verifiedToken.id)
        next()
    } catch (error) {
        res.status(400).json({success: false, message: 'Invalid Token', error})
    }


}