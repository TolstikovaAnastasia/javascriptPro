const express = require('express');
const fs = require('fs');
const app = express();
const router = require('./basketRouter');

app.use(express.json());
app.use('/', express.static('public'));
app.use('/api/basket', router);

app.get('/api/getProducts', (req, res) => {
    fs.readFile('server/json/getProducts.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    })
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));