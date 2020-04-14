const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts')
    .then(accounts =>{
        res.status(200).json({data: accounts})
    })
    .catch(err =>{
        console.log(err);
        res.status(404).json({message: "error 404"});
    })
})

router.get('/:id', (req, res) => {
    db('accounts').where({id: req.params.id})
    .first()
    .then(account =>{
        res.status(200).json({data: account})
    })
    .catch(err =>{
        console.log(err);
        res.status(404).json({message: "error 404"});
    })
})


module.exports = router;