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

router.get('/', adminCTL.allAdmin)
router.post('/addadmin', upload, adminCTL.addAdmin)
router.get('/editadmin', middleware.checkAuth ,adminCTL.editAdmin)
router.put('/edit', middleware.checkAuth ,upload, adminCTL.edit)
router.post('/login', adminCTL.loginAdmin)
router.delete('/delete', middleware.checkAuth, adminCTL.deleteAdmin)

module.exports = router