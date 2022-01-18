const fs = require('fs');
const path = require('path');

const controller = {
	home: (req, res) => {
		res.render('home');
	},

	producto: (req, res) => {
		res.render('producto');
	},
	
};

module.exports = controller;
