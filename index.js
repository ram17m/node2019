'use strict';
const express = require('express');
const app = express();
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

