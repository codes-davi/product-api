const express = require('express');
const router = express.Router();
const Product = require('../database/Product');
const Validation = require('../handlers/Validation');
const authHandler = require('../handlers/AuthHandler');

//jwt auth middleware
router.use(authHandler);

router.get('/', (req,res)=>{
    
    Product.findAll().then(products=>{
        if (products.length > 0) {
            res.statusCode = 200;
            res.json(products);
        } else {
            res.sendStatus(404);
        }
    }).catch(err=>{
        console.log(err);
        res.sendStatus(500);
    });

});

router.get('/:id', (req,res)=>{
    
    let id = parseInt(req.params.id);

    if (!isNaN(id)) {
        Product.findByPk(id).then(product => {
            if (product != undefined) {
                res.statusCode = 200;
                res.json(product);
            } else {
                res.sendStatus(404);
            }
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(400);
    }

});

router.post('/', (req,res)=>{

    let name = req.body.name?.trim();
    let {description, price, categoryId} = req.body;

    if (Validation.validateProduct(name, price, description)) {
        Product.create({
            name: name,
            price: price,
            description: description,
            categoryId: categoryId
        }).then(() => {
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err.parent.code);
        });
    } else {
        res.sendStatus(400);
    }

});

router.delete('/:id', (req,res)=>{
    let id = parseInt(req.params.id);

    if (!isNaN(id) && id != 0) {
        Product.destroy({
            where:{
                id:id
            }
        }).then(row=>{
            if (row > 0) {
                res.sendStatus(200);
            } else {
                res.sendStatus(404);
            }
        }).catch(err=>{
            console.log(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(400);
    }

});

router.put('/:id', (req,res)=>{
    
    let id = parseInt(req.params.id);
    let {name, description, price, categoryId} = req.body;

    if (isNaN(id)) return res.sendStatus(400);

    Product.update({
        name: name,
        price: price,
        description: description,
        categoryId: categoryId
    }, {
        where: {
            id: id
        }
    }).then((row) => {
        if (row == 0) return res.sendStatus(400);
        res.sendStatus(200);
    }).catch(() => {
        res.sendStatus(500);
    });


});

module.exports = router;