const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    password:{type:String},
    phone:{type:Number},
    firstname:{type:String},
    lastname:{type:String},
    about:{type:String},
    status:{type:String},
    linkedin:{type:String},
    github:{type:String},
    image:{type:String},
    website:{type:String},
});

module.exports = mongoose.model("Profile", profileSchema);