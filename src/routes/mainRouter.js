const express = require('express');
const router = express.Router();


const mainController = require('../controllers/mainController');

router.get('/', mainController.home); 
router.get('/crear-producto', mainController.home); 
router.get('/producto', mainController.producto); 
router.get('/detail/:id', mainController.detail);


module.exports = router;
