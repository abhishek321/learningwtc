require('dotenv').config();
require('./config/db');
const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const app = express();
app.use(bodyParser.json());
app.use('/users', usersRouter);
app.listen(process.env.PORT,()=>{
    console.log(`Server connected on this:${process.env.PORT}`);
})