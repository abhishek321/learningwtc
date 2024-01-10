const categoryModel = require("../models/category");
exports.createCategory= async (req,res,next)=>{
    try {
        const {name,description,date} = req.body;       
        const categoryInserted = await new categoryModel({name,description,created_at:date}).save();
        res.status(200).json({message:"Category added successfully",category:categoryInserted});
      
    } catch (error) {
     next(error);
    }
  
  };
exports.updateCategory = async (req,res,next)=>{
    try {
        const book = await categoryModel.findById(req.param.id);
      if(!book){
        return res.status(404).json({message:"Book not found"});
        }
        const updateBookInfo = new bookModel.findByIdAndUpdate(req.param.id,{...req.body},{new:true});
        res.status(200).json({message:"Catgory information updated",category:updateBookInfo});
      
    } catch (error) {
        next(error);
    }
  
  };

  exports.getCategories = async (req,res,next)=>{
    try {
        const categories = await categoryModel.find();
      if(!categories){
        return res.status(404).json({message:"Category not found"});
        }
        res.status(200).json({message:"Catgory information updated",categories});
      
    } catch (error) {
        next(error);
    }
  
  };