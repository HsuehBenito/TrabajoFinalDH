// const path = require('path');
// const { body } = require('express-validator');

// module.exports = [
	
// 	body('email')
// 		.notEmpty()
// 		.withMessage('Tienes que escribir un correo electrónico')//bail
// 		.isEmail()
// 		.withMessage('Debes escribir un formato de correo válido'),
// 	body('password')
// 		.notEmpty().withMessage('Tienes que escribir una contraseña')
// 		.isLength({min:8})
// 		.matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,"i").withMessage("La contraseña debe ser una combinacion de letras mayúsculas, minúsculas, un número y un carácter especial.")
// 		,
// 	body('telefono')
// 		.notEmpty()
// 		.isAlphanumeric()
// 		.withMessage('Tienes que poner un numero valido'),
// 	body('foto_perfil').custom((value, { req }) => {
// 		let file = req.file;
// 		let acceptedExtensions = ['.jpg', '.png', '.gif','.jpeg'];

// 		if (!file) {
// 			throw new Error('Tienes que subir una imagen');
// 		} else {
// 			let fileExtension = path.extname(file.originalname);
// 			if (!acceptedExtensions.includes(fileExtension)) {
// 				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
// 			}
// 		}

// 		return true;
// 	})
// ]