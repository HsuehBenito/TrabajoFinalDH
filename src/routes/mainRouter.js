const express = require('express');
const router = express.Router();


const mainController = require('../controllers/mainController');

router.get('/', mainController.home); 
router.get('/crear-producto', mainController.home); 


module.exports = router;
