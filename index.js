'use strict';

const express = require('express');
const animal = require('./model/animal');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));

app.get('/animals', async (req, res) => {
    // simple query
    try {
        res.json(await animal.getAll());
    } catch (e) {
        console.log(e);
        res.send('db error :(');
    }
});

app.get('/animal', async (req, res) => {
    console.log(req.query);
    try {
        res.json(await animal.search(req.query.name));
    } catch (e) {
        res.send('db error');
    }
});

app.post('/animal', bodyParser.urlencoded({extended: true}), async (req, res) => {
    console.log(req.body);
    try {
        res.json(await animal.insert(req.body.name, req.body.dob));
    } catch (e) {
        console.log(e);
        res.send('db error');
    }
});

app.get('/', (req, res) => {
    res.send('Hello from the my Node server');

});

app.get('/demo', (req, res) => {
    console.log('request', req);
    res.send('Demo');

});
app.listen(3000, () => {
    console.log('Server app start?')
});

