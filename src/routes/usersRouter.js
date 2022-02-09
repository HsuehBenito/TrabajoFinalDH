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


router.get('/login', usersController.login);

router.get('/registro', usersController.formulario);
router.post('/registro', usersController.userstore);

router.get('/carrito', usersController.carrito);



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