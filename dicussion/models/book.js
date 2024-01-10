const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,get:v=>(v/100).toFixed(2), set:v=>v*100, required:true},
    description:{type:String,required:true},
    category_id:{type:mongoose.Schema.Types.ObjectId,ref:'Category',required:true,index:true},
    ratings:{type:Number,get:v=>(v/10).toFixed(1),set:v=>v*10},
    publishedDate:{type:Date,default:Date.now()},
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

const Book = mongoose.model('Book',bookSchema);
module.exports = Book;