const express = require('express');
const router = express.Router();

// Controller
const usersController = require('../controllers/userController');

// Middlewares
const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Formulario de registro
router.get('/register', guestMiddleware, usersController.register);

// Procesar el registro
router.post('/register', uploadFile.single('avatar'), validations, usersController.processRegister);

// Formulario de login
router.get('/login', guestMiddleware, usersController.login);

// Procesar el login
router.post('/login', usersController.loginProcess);

// Perfil de Usuario
router.get('/profile', authMiddleware, usersController.profile);

// Logout
router.get('/logout', usersController.logout);

//products
router.get('/crear-producto', usersController.crear);
router.get('/editar-producto/:id', usersController.edit);

router.get('/carrito', usersController.carrito);
// crear-edit
router.put('/editar-producto/:id',uploadFile.single("img"), usersController.update); // agregamos uploadfile.single para ver si pega encima
// delete
router.delete('/delete/:id', usersController.destroy);
// multer
router.post('/crear-producto', uploadFile.single('img'),usersController.store); (req, res) => {
    console.log(req.file); //devuelve objeto con informacion del archivo
    const file = req.file;
    if (!file) {
        const error = new Error("Por favor sube tu imagen")
        error.httpStatusCode = 400
        return next(error)
    } //implementacion codigo error en caso de error al subir archivo
    res.send(file)
    res.redirect('/')
}

module.exports = router;