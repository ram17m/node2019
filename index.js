'use strict';

const express = require('express');
const connection = require('./model/db.js');

const app = express();
const bodyParser = require ('body-parser');
app.use(express.static('public'));


app.get('/animals', async (req, res) => {

    try {
        const [results, fields] = await connection.query(
            'SELECT * FROM wild');

        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
        res.json(results);
    } catch (e) {
        console.log(e);
        res.send('db error...');
    }

});

app.get('/animal' ,async(req, res) => {
    console.log(req.query);
   // res.send(`query params? ${req.query}`);
   try {
       const [results] = await connection.query(
           'SELECT * FROM wild WHERE name LIKE ?',
           [req.query.name]);
        res.json(results);
   } catch(e) {
       res.send(`db error ${e}`);
   }

});

app.post('/animal',bodyParser.urlencoded({extended: true}), async (req,res) => {
    console.log(req.body);
     try {
         const [result] = await connection.query('INSERT INTO wild (name) VALUES (?)',
         [req.body.name]
         );
        res.json(result);

     } catch (e){
         console.log(e);
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

