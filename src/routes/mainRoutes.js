const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');


router.get('/', mainController.home);
router.get('/crear-producto', mainController.home);
router.get('/producto', mainController.index); 
router.get('/detail/:id', mainController.detail);
router.get('/api', mainController.api);
router.get('/api/:id', mainController.show);

module.exports = router;