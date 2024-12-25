const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://bhuvabrijesh14:Nsv3WoGZtCiH6ypb@cluster0.1ssoo.mongodb.net/?retryWrites=true&w=majority&appName=Next_PR')
const db = mongoose.connection;

db.once('open', (err)=> {
    if(err){
        console.log('Database connection error', err)
    }else{
        console.log("Database connection successfully.")
}
})

module.exports = db