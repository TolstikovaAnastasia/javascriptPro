const express = require('express');
const fs = require('fs');
const router = express.Router();
const handler = require('./handler');

router.get('/', (req, res) => {
    fs.readFile('server/json/getBasket.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    })
});
router.post('/', (req, res) => {
    handler(req, res, 'add', 'server/json/getBasket.json');
});
router.put('/:id', (req, res) => {
    handler(req, res, 'change', 'server/json/getBasket.json');
});
router.delete('/:id', (req, res) => {
    handler(req, res, 'remove', 'server/json/getBasket.json');
});

module.exports = router;