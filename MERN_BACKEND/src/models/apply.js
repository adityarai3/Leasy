const mongoose = require("mongoose");

const applySchema = new mongoose.Schema({

    name : {
        type:String,
        required:true
    },
    date : {
        type:String,
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
    },
    jobprofile : {
        type:String,
        required:true
    },
    salary : {
        type:Number,
        required:true
    }
})

//Now we need to cretae collection
const Apply = new mongoose.model("Apply",applySchema);

module.exports = Apply;