const express = require('express')
const router = express.Router()
const multer = require('multer')
const productCTL = require("../controller/productCTL")
const middleware = require('../middleware/adminAuth')


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'Images')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})
    
const upload = multer({storage: storage}).single('image')


router.get('/', middleware.checkAuth ,productCTL.getProduct)
router.post('/addproduct', middleware.checkAuth ,upload ,productCTL.addProduct)
router.delete('/delete', middleware.checkAuth ,upload ,productCTL.deleteProduct)
router.get('/editproduct', middleware.checkAuth ,productCTL.editProduct)
router.put('/edit', middleware.checkAuth ,upload ,productCTL.edit)


module.exports = router