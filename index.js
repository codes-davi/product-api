const express = require('express');
const app = express();
const connection = require('./database/dbconfig');
const productController = require('./routes/ProductController');
const categoryController = require('./routes/CategoryController');
const {router: authController} = require('./routes/AuthController');

//setting body encode
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Authenticate
connection.authenticate().then(()=>{
    console.log('Authenticated');
}).catch(err=>{
    console.log(err);
});

//main routers
app.use('/auth', authController);
app.use('/product', productController);
app.use('/category', categoryController);

app.listen(3000,()=>{
    console.log('running');
});