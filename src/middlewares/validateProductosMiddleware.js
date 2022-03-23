const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('nombre')
		.notEmpty().withMessage('Tienes que escribir un nombre')
		.isLength({min:5}).withMessage('Debe tener al menos 5 caracteres'),
		
	body('descripcion')
		.isLength({min:20}).withMessage('Debe tener al menos 20 caracteres'),
	
	body('img').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.gif','.jpeg'];

		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	})
]