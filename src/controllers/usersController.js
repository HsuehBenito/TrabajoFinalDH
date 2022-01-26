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
	crear: (req,res) => {
		res.render('crear-producto')
	},
	editar: (req,res) => {
		res.render('editar-producto')
	}
};

module.exports = controller;
