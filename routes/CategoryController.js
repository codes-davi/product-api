const express = require('express');
const router = express.Router();
const Category = require('../database/Category');
const authHandler = require('../handlers/AuthHandler');
const {category: hateoas} = require('../handlers/HateoasDefault');

//jwt auth middleware
router.use(authHandler);

router.get('/', (req,res)=>{
   
    Category.findAll().then(categories=>{
        if(categories.length > 0){
            res.statusCode = 200;
            res.json({categories, _links: hateoas});
        }else{
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
        Category.findByPk(id).then(category=>{
            if(category != undefined){
                res.statusCode = 200;
                res.json({category, _links: hateoas});
            }else{
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

router.get('/title/:title', (req,res)=>{
    
    let title = req.params.title;

    if (isNaN(title) && title != undefined) {
        Category.findOne({
            where:{
                title:title
            }
        }).then(category=>{
            if(category != undefined){
                res.statusCode = 200;
                res.json({category, _links: hateoas});
            }else{
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


router.post('/', (req,res)=>{

    let {title, description} = req.body;

    if(title != undefined && title.trim() != ''){
        Category.findOne({
            where:{
                title:title
            }
        }).then(category=>{
            if (category == undefined) {
                Category.create({
                    title: title,
                    description: description
                }).then(()=>{
                    res.sendStatus(200);
                }).catch(err=>{
                    console.log(err);
                    res.sendStatus(500);
                });
            } else {
                res.statusCode = 200;
                res.json('Category already exits');
            }
        }).catch(err=>{
            console.log(err);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(400);
    }
});

router.put('/:id', (req, res) => {

    let id = parseInt(req.params.id);
    let {title, description} = req.body;

    if (!isNaN(id) || (description && title) == undefined) {
        Category.update({
            description: description,
            title: title
        }, {
            where: {
                id: id
            }
        }).then(row => {
            console.log(row);
            res.sendStatus(200);
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(400);
    }

});

router.delete('/:id', (req,res)=>{
    
    let id = parseInt(req.params.id);

    if (!isNaN(id)) {
        Category.destroy({
            where:{
                id:id
            }
        }).then((row)=>{
            if (row>0) {
                res.sendStatus(200);
            } else {
                res.statusCode = 200;
                res.json(`No Category with id: ${id}`);
            }
        }).catch(err=>{
            console.log(err);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(400);
    }

});

module.exports = router;