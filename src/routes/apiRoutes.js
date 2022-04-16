const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');

router.get('/', apiController.api);
router.get('/admin', apiController.admin);
router.get('/categorias', apiController.categorias);
router.post('/ventas', apiController.ventas);


module.exports = router;