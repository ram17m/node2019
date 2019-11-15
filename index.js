'use strict';

require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
  });

const app = express();
app.use(express.static('public'));

app.get('/animal', (req, res) => {
    connection.query(
        'SELECT * FROM wild',
        (err, results, fields) => {
          console.log(results); // results contains rows returned by server
          console.log(fields); // fields contains extra meta data about results, if available
          res.json(results);
        }
      );
});

app.get('/',(req,res) =>{
    res.send('Hello from the my Node server');

});
app.get('/demo',(req,res) =>{
    console.log('request', req);
    res.send('Demo');

});
app.listen(3000, () => {
    console.log('Server app start?')
});

