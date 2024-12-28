const Admin = require('../model/adminSchema')
const path = require('path')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const moment = require('moment')



module.exports.allAdmin = async (req, res)=> {
    try {
        const data = await Admin.find({})
        res.status(200).json({success: true, message: "Admin find successfully.",data})
    } catch (error) {
        console.log(error)
    }
}

module.exports.addAdmin = async (req, res)=> {
    try {
        const existemail = await Admin.findOne({email: req.body.email})
        if(existemail){
            return res.status(400).json({success: false, message: "Email address already exist."})
        }
        if(req.body.password === req.body.confirmps){
            
            if(req.file){
                req.body.image = req.file.filename
            }

            req.body.createdAT = moment().format('LLLL')
            const data = await Admin.create(req.body)
            const token = jwt.sign({id: data._id}, 'admin', {expiresIn: '5h'})
            res.status(201).json({success: true, message: "Admin regestration successfully.", data, token})
            
        }else{
            return res.status(400).json({success: false, message: "Password and comfirm password must be same."})

        }

       
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

        const adminimage = await Admin.findById(req.query.id)
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
            if(req.body.password === Admindata.password){
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


module.exports.deleteAdmin = async (req, res)=> {
    try {
        const adminimage = await Admin.findById(req.query.id)
        if(adminimage.image){
            const oldImage = path.join(__dirname, '../Images/Admin/', adminimage.image)
            if(fs.existsSync(oldImage)){
                fs.unlinkSync(oldImage)
            }
        }
        const data = await Admin.findByIdAndDelete(req.query.id)
        res.status(200).json({success: true, message: "Admin deleting successfully.", data})
        
    } catch (error) {
        res.status(400).json({success: false, message: "Admin deleting error", error})
    }
}