const Product = require('../model/productSchema')
const path = require('path')
const fs = require('fs')
const moment = require('moment')

module.exports.getProduct = async (req, res)=> {
    try {
        const data = await Product.find({})
        if(data.length <= 0){
           return res.status(404).json({success: false, message: "Data not found"})
        }
        res.status(200).json({success: true, message: "Data get successfully", data})
    } catch (error) {
        res.status(400).json({success: false, message: "Data getting error", error})
    }
}


module.exports.addProduct = async (req, res)=> {
    try {

        if(req.file){
            req.body.image = req.file.filename
        }
        req.body.createdAT = moment().format('LLLL')
        const data = await Product.create(req.body)
        res.status(201).json({success: true, message: "Product adding successfully", data})

    } catch (error) {
        res.status(400).json({success: false, message: "Product adding error", error})
    }
}


module.exports.deleteProduct = async (req, res)=> {
    try {
        
        const deleteimage = await Product.findById(req.query.id)
        if(deleteimage.image){
            const oldImage = path.join(__dirname, '../Images/', deleteimage.image)
            if(fs.existsSync(oldImage)){
                fs.unlinkSync(oldImage)
            }
        }
        const data = await Product.findByIdAndDelete(req.query.id)
        res.status(200).json({success: true, message: "Product delete successfully.",data})
    } catch (error) {
        res.status(400).json({success: false, message: "Product deleting error", error})
    }
}


module.exports.editProduct = async (req, res)=> {
    try {
        const data = await Product.findById(req.query.id)
        res.status(200).json({success: true, message: "Product edit data get successfully.", data})
    } catch (error) {
        res.status(400).json({success: false, message: "Product edit data getting error", error})
    }
}


module.exports.edit = async (req, res)=> {
    try {
        const editimage = await Product.findById(req.query.id)
        if(editimage.image){
            const oldImage = path.join(__dirname, '../Images/', editimage.image)
            if(fs.existsSync(oldImage)){
                fs.unlinkSync(oldImage)
            }
        }
        if(req.file){
            req.body.image = req.file.filename
        }else{
            req.body.image = editimage.image
        }

        const data = await Product.findByIdAndUpdate(req.query.id, req.body)
        res.status(201).json({success: true, message: "Product updated successfully.", data})
        
    } catch (error) {
        res.status(400).json({success: false, message :'Product editing error', error})
    }
}