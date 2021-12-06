const express = require('express');
const path = require('path');
const app = express();

app.get('', (req,res) =>{
    res.send("Iniciardo"); 
});

app.get('/home', (req,res) =>{
    
    res.sendFile((__dirname + '/views/home.html'));
});

app.use(express.static(path.join(__dirname, './public')));  

app.listen(3002, () => {
    console.log("Servidor ON");
});