const express = require('express');
const router = express.Router();


const usersController = require('../controllers/usersController');



const multerDiskStorage = multer.DiskStorage({
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
router.post('/crear-producto', uploadFile.single('avatar'),usersController.)

module.exports = router;
