const fs = require('fs');
const path = require('path');

const controller = {
	
	login: (req, res) => {
		res.render('login');
	},

	formulario: (req, res) => {
		res.render('formulario');
	},
	
	carrito: (req, res) => {
		res.render('carrito');
	},
};

module.exports = controller;
