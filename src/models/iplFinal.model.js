const mongoose = require("mongoose");

const iplFinalSchema = new mongoose.Schema({
    year:{
        type:Number,
        required:true
    },
    team1:{
        type:String,
        required:true
    },
    team2:{
        type:String,
        required:true
    },
    score:{
        type:String,
        required:true
    },
    winner:{
        type:String,
        required:true
    },
    result:{
        type:String,
        required:true
    },
    venue:{
        type:String,
        required:true
    }
})

const iplFinal = mongoose.model("iplFinal", iplFinalSchema);

module.exports = iplFinal;