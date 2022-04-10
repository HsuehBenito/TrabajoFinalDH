const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');

router.get('/', apiController.api);
router.get('/admin', apiController.admin);



module.exports = router;