const mongoose = require("mongoose");
async function dbConnect(){
const conn = await mongoose.connect("mongodb://127.0.0.1:27017/onlinestore");
return "DB connected";
}
dbConnect().then((con)=>console.log(con)).catch((error)=>{console.log(error)});