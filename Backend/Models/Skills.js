const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
    name:{type:String},
    description:{type:String},
    image:{type:String},
});

module.exports = mongoose.model("Skills", skillsSchema);