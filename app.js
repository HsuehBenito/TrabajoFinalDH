const express = require('express');
const path = require('path');
const app = express();

app.get('', (req,res) =>{
    
    res.sendFile((__dirname + '/views/home.html'));
});
app.get('/registro', (req,res) =>{
    
    res.sendFile((__dirname + '/views/formulario.html'));
});

app.get('/login', (req,res) =>{
    
    res.sendFile((__dirname + '/views/login.html'));
});

app.get('/producto', (req,res) =>{
    
    res.sendFile((__dirname + '/views/producto.html'));
});

app.get('/carrito', (req,res) =>{
    
    res.sendFile((__dirname + '/views/carrito.html'));
});

app.use(express.static(path.join(__dirname, './public')));  


app.listen(process.env.PORT || 3002, () => {
    console.log("Servidor ON MAKINOLA");
});