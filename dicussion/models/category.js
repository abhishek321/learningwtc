const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name:{type:String,unique:true,min:[3,"Category should be 3 char long"],max:[50,"Category should not exceed 50 characters"],required:true,index:true},
    description:{type:String,max:100},
    created_at:{type:Date},
    modified_at:{type:Date,default:Date.now()},
},
{ 
    toJSON: { 
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
        delete ret._id; // Remove the '_id' field
        },
        getters: true
     } //this right here
});
const Category = mongoose.model('Category',categorySchema);
module.exports = Category;