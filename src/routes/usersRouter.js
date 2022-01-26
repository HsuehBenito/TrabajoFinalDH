const express = require('express');
const router = express.Router();


const usersController = require('../controllers/usersController');

router.get('/login', usersController.login)

router.get('/registro', usersController.formulario)

router.get('/carrito', usersController.carrito)


router.get('/crear-producto', usersController.crear)
router.get('/editar-producto', usersController.editar); 

// 
router.post('/crear-producto', usersController.crear); 
router.post('/editar-producto', usersController.editar); 

module.exports = router;
