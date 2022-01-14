const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

//setting jwt secret
const secret = 'd6s%ts*gh&5&s';

//routes
router.get('/', (req,res)=>{
    let {user} = req.body;

    if(!user) return res.sendStatus(400);

    jwt.sign({user: user}, secret, {expiresIn: '1h'},(err,token)=>{
        if(err) return res.sendStatus(500);

        res.status(200).json({token: token});
    });

});

module.exports = {router, secret};