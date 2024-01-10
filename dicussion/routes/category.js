const express = require('express');
const router = express.Router();
const categoryController = require("../contollers/category");
router.post('/',categoryController.createCategory);
router.get('/',categoryController.getCategories);
router.patch('/:id',categoryController.updateCategory);
module.exports = router;