const express = require('express');
const router = express.Router();
const Category = require('../database/Category');
const Product = require('../database/Product');

router.get('/', (req,res)=>{
    res.send('');
});

module.exports = router;