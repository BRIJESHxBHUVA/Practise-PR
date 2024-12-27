const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    createdAT: {
        type: String,
        require: true
    }
})


const Admin = mongoose.model('admin', adminSchema)
module.exports = Admin