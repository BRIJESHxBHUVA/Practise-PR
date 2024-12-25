const express = require('express')
const router = express.Router()
const multer = require('multer')
const adminCTL = require('../controller/adminCTL')
const middleware = require('../middleware/adminAuth')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'Images/Admin')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})
    
const upload = multer({storage: storage}).single('image')


router.post('/addadmin', upload, adminCTL.addAdmin)
router.get('/editadmin', adminCTL.editAdmin)
router.put('/edit', upload, adminCTL.edit)
router.post('/login', adminCTL.loginAdmin)

module.exports = router