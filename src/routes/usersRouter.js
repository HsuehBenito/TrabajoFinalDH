const express = require('express');
const router = express.Router();


const usersController = require('../controllers/usersController');

router.get('/login', usersController.login)

router.get('/registro', usersController.formulario)

router.get('/carrito', usersController.carrito)



router.get('/crear-producto', usersController.crear)
router.get('/editar-producto/:id', usersController.edit); 

// crear-edit
router.post('/crear-producto', usersController.crear); 
router.put('/editar-producto/:id/', usersController.update); 
// delete
router.delete('/delete/:id', usersController.destroy);

module.exports = router;
