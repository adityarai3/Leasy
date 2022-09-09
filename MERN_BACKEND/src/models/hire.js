const mongoose = require("mongoose");

const hireSchema = new mongoose.Schema({
    
    name : {
        type:String,
        required:true
    },
    jobprofile : {
        type:String,
        required:true
    },
    workernumber : {
        type:Number,
        required:true
    },
    salary : {
        type:Number,
        required:true
    },
    experience : {
        type:Number,
        required:true
    },
    mobile : {
        type:Number,
        required:true
    },
    address : {
        type:String,
        required:true
    },
    adhaar : {
        type:Number,
        required:true
    }
})

//Now we need to create Coolection
const Hire = new mongoose.model("Hire",hireSchema);
module.exports = Hire;