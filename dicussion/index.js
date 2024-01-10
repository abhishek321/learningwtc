const express = require('express');
require('dotenv').config();
require("./config/db");
const bodyparser = require("body-parser");
const app = express();

const bookRoutes = require('./routes/books');
const categoryRoutes =  require("./routes/category");
const errorHandler = require("./middleware/errorHandler");
app.use(bodyparser.json());
// app.use(express.static(path.join(__dirname, 'views')));
app.use('/book',bookRoutes);
app.use('/category',categoryRoutes);
app.use(errorHandler);
app.listen(3001,()=>{
    console.log(`Server is connected on :3001`);
})