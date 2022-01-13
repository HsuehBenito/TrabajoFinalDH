const fs = require('fs');
const path = require('path');

const controller = {
	home: (req, res) => {
		res.render('home');
	},
	login: (req, res) => {
		res.render('login');
	},
	producto: (req, res) => {
		res.render('producto');
	},
	formulario: (req, res) => {
		res.render('formulario');
	},
	carrito: (req, res) => {
		res.render('carrito');
	},
};

module.exports = controller;
