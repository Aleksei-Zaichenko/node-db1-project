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

router.post('/', (req, res) =>{
    const accountData = req.body;
    db('accounts').insert(accountData, 'id')
    .then(newAccountID => {
        res.status(200).json({message: `New account was created and added to database, ID:${newAccountID} `})
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({message: "error 500"});
    })
})

router.put('/:id', (req, res) =>{
    db('accounts')
    .where({id: req.params.id})
    .update(req.body)
    .then(updated =>{
        if(updated){
            res.status(201).json({message: `account with ID:${req.params.id} was updated` })
        } else {
            res.status(500).json({message: `account with ID:${req.params.id} was  not updated` })
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(404).json({message: "error 404"});
    })
})

router.delete('/:id', (req, res) =>{
    db('accounts')
    .where({id: req.params.id})
    .del()
    .then(deleted => {
        if(deleted){
            res.status(201).json({message: `account with ID:${req.params.id} was deleted` })
        } else {
            res.status(500).json({message: `account with ID:${req.params.id} was  not deleted` })
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(404).json({message: "error 404"});
    })
})

module.exports = router;