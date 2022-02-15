const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const usersController = require('../controllers/usersController');
const app = express();



const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'../../public/img'))
    },
    filename:function(req, file, cb) { //le cambiamos res a file
        cb(null, Date.now() + path.extname(file.originalname))
    }
});
const uploadFile = multer({storage: multerDiskStorage});
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
//get form login
router.get('/login', usersController.login);
//procesar login
router.post('/login', usersController.loginPost);
//get registro 
router.get('/registro',guestMiddleware, usersController.formulario);
//procesar registro
router.post('/registro', validations, usersController.userstore);

router.get('/carrito', usersController.carrito);

// Perfil de Usuario
router.get('/profile', authMiddleware, usersController.profile);
//logout
router.get('/logout/', usersController.logout);

router.get('/crear-producto', usersController.crear);
router.get('/editar-producto/:id', usersController.edit);

// crear-edit
//router.post('/crear-producto', usersController.crear); lo comentamos para ver si es que pisaba y cagaba todo.
router.put('/editar-producto/:id',uploadFile.single("avatar"), usersController.update); // agregamos uploadfile.single para ver si pega encima
// delete
router.delete('/delete/:id', usersController.destroy);
// multer
router.post('/crear-producto', uploadFile.single('avatar'),usersController.store); (req, res) => {
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
//agregue branch