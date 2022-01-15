const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const {auth: hateoas} = require('../handlers/HateoasDefault');

//setting jwt secret
const secret = 'd6s%ts*gh&5&s';

//routes
router.get('/', (req,res)=>{
    let {user} = req.body;

    if(!user) return res.sendStatus(400);

    jwt.sign({user: user}, secret, {expiresIn: '1h'},(err,token)=>{
        if(err) return res.sendStatus(500);

        res.status(200).json({token: token, _links: hateoas});
    });

});

module.exports = {router, secret};