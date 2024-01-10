const express = require('express');
const Authmiddleware = require('../middleware/auth');
const router = express.Router();
const {body,param} = require("express-validator");

router.post('/',[
    Authmiddleware,
    body('note').notEmpty().withMessage("Note is required").isLength({ max: 250 }).withMessage('Note content can not exceed more than 250 characters'),
    body('tag').notEmpty().withMessage("Tag is required"),
    body('channel').notEmpty().withMessage("Channel is required"),
])
