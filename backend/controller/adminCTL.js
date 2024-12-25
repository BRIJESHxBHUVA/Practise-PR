const Admin = require('../model/adminSchema')
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')


module.exports.addAdmin = async (req, res)=> {
    try {
        const existemail = await Admin.findOne({email: req.body.email})
        if(existemail){
            return res.status(400).json({success: false, message: "Email address already exist."})
        }
        const data = await Admin.create(req.body)
        res.status(201).json({success: true, message: "Admin regestration successfully.", data})
    } catch (error) {
        res.status(400).json({success: false, message: "Admin regestration error", error})
    }
}


module.exports.editAdmin = async (req, res)=> {
    try {
        const data = await Admin.findById(req.query.id)
        res.status(200).json({success: true, message: "Admin profile data get sucessfully.", data})
    } catch (error) {
        res.status(400).json({success: false, message: "Admin profile editing error", error})
    }
}


module.exports.edit = async (req, res)=> {
    try {

        const adminimage = await Admin.findById(req.body.id)
        if(adminimage.image){
            const oldImage = path.join(__dirname, '../Images/Admin/', adminimage.image)
            if(fs.existsSync(oldImage)){
                fs.unlinkSync(oldImage)
            }
        }
        if(req.file){
            req.body.image = req.file.filename 
        }else{
            req.body.image = adminimage.image
        }

        const data = await Admin.findByIdAndUpdate(req.query.id, req.body)
        res.status(201).json({success: true, message: "Admin profile edite successfully.", data})

    } catch (error) {
        res.status(400).json({success: false, message: "Admin profile editing error", error})
    }
}


module.exports.loginAdmin = async (req, res)=> {
    try {
        const Admindata = await Admin.findOne({email: req.body.email})
        if(Admindata){
            if(Admindata.password){
                const token = jwt.sign({id: Admindata._id}, 'admin', {expiresIn: '5h'})
                res.status(200).json({success: true, message: "Login successfully.", Admindata, token})
            }else{
                res.status(404).json({success: false, message: "Invalid password"})
            }
        }else{
            res.status(404).json({success: false, message: "Invalid email address"})
        }
    } catch (error) {
        res.status(400).json({success: false, message: "Admin login error", error})
    }
}