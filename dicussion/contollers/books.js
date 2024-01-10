const bookModel = require("../models/book");
exports.createBook = async (req,res,next)=>{
    try {
        const {name,description,price,category_id,ratings} = req.body;
       const book = await bookModel.findOne({name,category_id});
      if(book){
        return res.status(404).json({message:"Book already exist with same category and book name"});
        }
        const bookInserted = await new bookModel({name,price,description,category_id,ratings}).save();
        res.status(201).json({message:"Book added successfully",book:bookInserted});
      
    } catch (error) {
     next(error);
    }
  
  };
exports.updateBook = async (req,res,next)=>{
    try {
       
        const book = await bookModel.findOne({_id:req.params.id,category_id:req.params.category_id});
      if(!book){
        return res.status(404).json({message:"Book not found"});
        }
        const updateBookInfo = await bookModel.findByIdAndUpdate(req.params.id,{...req.body},{new:true});
        res.status(200).json({message:"Book information updated",book:updateBookInfo});
      
    } catch (error) {
        next(error);
    }
  
  };
  exports.getBooks = async (req,res,next)=>{
    try {
        const books = await bookModel.find();
      if(!books){
        return res.status(404).json({message:"Book not found"});
        }
        res.status(200).json({books});
      
    } catch (error) {
        next(error);
    }
  
  };
  exports.getBookWithCategory = async (req,res,next)=>{
    try {
      const books = await bookModel.find().populate('category_id','name');
      res.status(200).json({message:"Records",books});
    } catch (error) {
      next(error)
    }
  }
  exports.getBookOrCategory = async (req,res,next)=>{
    try {
      let books = null;
      if (typeof req.params.id !== 'undefined' && req.params.category_id) {
         books = await bookModel.findOne({_id:req.params.id,category_id:req.params.category_id});
      }else if (typeof req.params.id !== 'undefined') {
         books = await bookModel.findById(req.params.id);        
      }else if (typeof req.params.category_id !== 'undefined') {
         books = await bookModel.find({category_id:req.params.category_id}).populate({
          path: 'category_id',
          select: 'name created_at modified_at -_id', // Select only the 'name' field from the referenced document
        });
      }
      if(!books){
        return res.status(404).json({message:"Book not found"});
        }      
      res.status(200).json({message:"Records",books});
    } catch (error) {
      next(error)
    }
  }
  exports.getBookPriceByCategory= async (req,res,next)=>{
    try {
      
      const aggregateResult = await bookModel.aggregate([
        {
          $group: {
            _id: '$category_id', // Group by the category_id
            totalPrice: { $sum: '$price' }, // Calculate the sum of prices for each category
          },
        },
        {
          $lookup: {
            from: 'categories', // Assuming your category collection is named 'categories'
            localField: '_id',
            foreignField: '_id',
            as: 'category',
          },
        },
        {
          $unwind: '$category',
        },
        {
          $project: {
            categoryName: '$category.name', // Include the category name
            totalPrice: {
              $divide: ['$totalPrice', 100], // Divide total price by 100
            }, // Include the total price
          },
        },
        {
          $project: {
            categoryName: 1, // Include the category name
            totalPrice: {
              $concat: [
                { $toString: { $round: ['$totalPrice', 2] } }, // Round and convert to string
                ' USD', // Add ' USD' to the end
              ],
            },
          },
        },
      ]);
      
      res.status(200).json({message:"Records",books:aggregateResult});
    } catch (error) {
      next(error)
    }
                   
    
  }