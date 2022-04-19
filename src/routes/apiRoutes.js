const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');

router.get('/', apiController.api);

router.get('/categorias', apiController.categorias);



module.exports = router;