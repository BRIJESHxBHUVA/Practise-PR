const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
app.use(express.json())
app.use(cors())
const db = require('./database/db')
const path = require('path')

app.use('/product', require('./routes/productRouting'))
app.use('/admin', require('./routes/adminRoutes'))

app.use('/Images', express.static(path.join(__dirname, 'Images')))
app.use('/Images/Admin', express.static(path.join(__dirname, 'Images/Admin')))

app.listen(port, (err)=> {
    if(err){
        console.log('Server starting error', err)
    }else{
        console.log("Server starting on port: ",port)
    }
})