const express = require('express');
const router = express.Router();


const mainController = require('../controllers/mainController');

router.get('/', mainController.home); 

router.get('/login', mainController.login)

router.get('/producto', mainController.producto)

router.get('/registro', mainController.formulario)

router.get('/carrito', mainController.carrito)

module.exports = router;
