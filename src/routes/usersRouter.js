const express = require('express');
const router = express.Router();
const multer = require('multer');

const usersController = require('../controllers/usersController');
const app = express();



const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'../../public/img'))
    },
    filename:function(req, res, cb) {
        let nombreImagen = Date.now() + path.extname(file.nombreOriginal);
        cb(null, nombreImagen);
    }
});
const uploadFile = multer({storage: multerDiskStorage});


router.get('/login', usersController.login);

router.get('/registro', usersController.formulario);

router.get('/carrito', usersController.carrito);



router.get('/crear-producto', usersController.crear);
router.get('/editar-producto/:id', usersController.edit);

// crear-edit
router.post('/crear-producto', usersController.crear);
router.put('/editar-producto/:id', usersController.update);
// delete
router.delete('/delete/:id', usersController.destroy);
// multer
app.post('/crear-producto', uploadFile.single('avatar'),usersController.store); (req, res) => {
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