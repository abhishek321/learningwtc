const bookController = require('../contollers/books');
const express = require("express");
const router = express.Router();
router.post('/',bookController.createBook);
router.patch('/:id/category/:category_id',bookController.updateBook);
router.get('/',bookController.getBooks);
router.get('/with-category',bookController.getBookWithCategory);
router.get('/:id?/category/:category_id?',bookController.getBookOrCategory);
router.get("/total-price-category",bookController.getBookPriceByCategory);
module.exports = router;

// /123/catergory/1234