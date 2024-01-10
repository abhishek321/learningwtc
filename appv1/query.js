db.sales.aggregate([
    {
        $lookup: {
            from: 'products',     // The name of the second collection
            localField: 'product', // The field from the 'sales' collection
            foreignField: '_id',   // The field from the 'products' collection
            as: 'productInfo'      // The alias for the joined data
        }
    },
    {
        $unwind: '$productInfo'  // Unwind the array created by $lookup
    },
    {
        $group: {
            _id: '$productInfo.name',   // Group by product name
            totalSales: { $sum: '$amount' }  // Calculate total sales for each product
        }
    },
    {
        $sort: { totalSales: -1 } // Sort by total sales in descending order
    },
    {
        $project: {
            _id: 0,              // Exclude the default _id field
            product: '$_id',     // Rename _id to product
            totalSales: 1        // Include totalSales field
        }
    },
    {
        $limit: 5               // Limit the output to the top 5 products
    }
]);
