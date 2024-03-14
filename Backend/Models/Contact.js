const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    message:{type:String},
    createdOn:{type:Date, default:Date.now()},
});

module.exports = mongoose.model("Contacts", contactSchema);
