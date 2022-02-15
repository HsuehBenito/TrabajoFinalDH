const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('name').notEmpty().withMessage('Tienes que escribir un nombre'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
	body('calle').notEmpty().withMessage('Tienes que ingresar una calle con su altura'),
	body('ciudad').notEmpty().withMessage('Tienes que elegir una ciudad'),
	body('genero').notEmpty().withMessage('Tienes elegir un genero'),
	body('nacimiento').notEmpty().withMessage('Tienes elegir una fecha'),
	body('mes').notEmpty().withMessage('Tienes elegir un mes'),
	body('year').notEmpty().withMessage('Tienes que seleccionar un año'),
	body('avatar').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png' ];

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