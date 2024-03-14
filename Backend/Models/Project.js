const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    image:{type:String},
    link:{type:String},
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }
});

module.exports = mongoose.model("Projects", projectSchema);