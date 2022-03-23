const path = require('path');
const { body } = require('express-validator');

module.exports = [
	body('nombre_completo')
		.notEmpty().withMessage('Tienes que escribir un nombre')
		.isLength({min:2}).withMessage('La nombre debe tener mas de 2 caracteres'),
	body('email')
		.notEmpty().withMessage('Tienes que escribir un correo electrónico')//bail
		.isEmail().withMessage('Debes escribir un formato de correo válido'),
	body('password')
		.notEmpty().withMessage('Tienes que escribir una contraseña')
		.isLength({min:8}).withMessage('La contraseña debe tener mas de 8 caracteres')
		.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,"i").withMessage("La contraseña debe ser una combinacion de letras mayúsculas, minúsculas, un número y un carácter especial."),
	body('telefono')
		.notEmpty().withMessage('Tienes que ingresar un telefono')
		.isAlphanumeric().withMessage('Tienes que poner un numero valido'),
	body('foto_perfil').custom((value, { req }) => {
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