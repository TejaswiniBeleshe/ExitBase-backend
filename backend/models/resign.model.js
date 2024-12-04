const mongoose = require('mongoose')


const resignSchema = new mongoose.Schema({
    employeeId:{
        type:String,
        required:true
    },
    lwd:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    }
})

const ResignInfo = mongoose.model('ResignInfo',resignSchema);
module.exports = ResignInfo;