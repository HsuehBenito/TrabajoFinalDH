const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/userController');

// Middlewares
const userUploadFile = require('../middlewares/usuariosMulter');
const productosUploadFile = require('../middlewares/productosMulter');
const registerValidations = require('../middlewares/validateRegisterMiddleware');
const loginValidations = require('../middlewares/validateLoginMiddleware');
const productosValidations = require('../middlewares/validateProductosMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Formulario de registro
router.get('/register', guestMiddleware, usersController.register);

// Procesar el registro
router.post('/register', userUploadFile.single('foto_perfil'), usersController.processRegister);//registerValidations,  

// Formulario de login
router.get('/login', guestMiddleware, usersController.login);

// Procesar el login
router.post('/login', loginValidations,usersController.loginProcess);//

// Perfil de Usuario
router.get('/profile', authMiddleware, usersController.profile);

// Logout
router.get('/logout', usersController.logout);

//products
router.get('/crear-producto', usersController.crear);

router.get('/carrito', usersController.carrito);
// edit
router.get('/editar-producto/:id', usersController.edit);
router.put('/editar-producto/:id', productosValidations, productosUploadFile.single("img"), usersController.update); // agregamos uploadfile.single para ver si pega encima
// delete
router.delete('/delete/:id', usersController.destroy);
// multer
router.post('/crear-producto',productosValidations, productosUploadFile.single('img'),usersController.store);// 

module.exports = router;