const bcryptjs = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const {
	validationResult
} = require('express-validator');

const User = require('../models/User');
const productsFilePath = path.join(__dirname, '../database/productosBaseDatos.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const controller = {
	login: (req, res) => {
		return res.render('login');
	},
	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/user/profile');
			} 
			return res.render('login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	},
	register: (req, res) => {
		return res.render('formulario');
	},
	processRegister: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render('formulario', {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let userInDB = User.findByField('email', req.body.email);

		if (userInDB) {
			return res.render('formulario', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}

		let userToCreate = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file.filename
		}

		let userCreated = User.create(userToCreate);

		return res.redirect('/user/login');
	},
	
	profile: (req, res) => {
		return res.render('profile', {
			user: req.session.userLogged
		});
	},

	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
	carrito: (req, res) => {
		res.render('carrito');
	},
	crear: (req,res) => {
		res.render('crear-producto')
	},
	edit: (req, res) => {


        let idProductoSeleccionado = req.params.id;
        let productoSeleccionado;

        for (let p of products){

            if(p.id==idProductoSeleccionado){
                productoSeleccionado=p;
                break;
			}
		}
		
	
			res.render('editar-producto',{producto: productoSeleccionado});
		},
		update: (req, res) => {
			console.log('llegue')
			let idProductoSeleccionado = req.params.id;
			let datos = req.body;
	
			for (let p of products){
				if(p.id==idProductoSeleccionado){
					productoSeleccionado=p;
					fs.unlink(path.join(__dirname, '../../public/img/' + p.image), (error) => {
						(console.log(error))
					
					});
					p.name = datos.name;
					p.price = datos.price;
					p.description = datos.description;
					p.image = datos.image;
					
					break;
				}
			}
			
	
			fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));

			
	
			res.redirect('/');
	
		},
		destroy : (req, res) => {

			let idProductoSeleccionado = req.params.id;
        	let productoSeleccionado;

        	for (let p of products){

            if(p.id==idProductoSeleccionado){
                productoSeleccionado=p;
                break;
            }
        }
			
			let products2 = products.filter(function(element){
				
				return element.id!=idProductoSeleccionado;
			})
			fs.unlink(path.join(__dirname, '../../public/img/' + productoSeleccionado.image), (error) => {
				(console.log(error))
			
			});

			fs.writeFileSync(productsFilePath, JSON.stringify(products2,null,' '));
	
			res.redirect('/');
	
	
		},
		
		store: (req, res) => {

			let nuevoID=(products[products.length-1].id)+1 
	
			let productoNuevo = {
				id: nuevoID,
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				discount: req.body.discount,
				image: req.file.filename,
				category: "in-sale"
			}
	
	
			products.push(productoNuevo)
	
			fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));
	
			res.redirect('/');
	
	
	
		},
}

module.exports = controller;