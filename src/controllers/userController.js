const bcryptjs = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const {
	validationResult
} = require('express-validator');

const User = require('../database/modelos-user/User.js');
const productsFilePath = path.join(__dirname, '../database/productosBaseDatos.json');
const db = require('../database/models/');
const { generateId } = require('../database/modelos-user/User');
const controller = {
	login: (req, res) => {
		return res.render('login');
	},
	loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			console.log(req.session.userLogged)
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
		// function findByField  (field, text) {
		// 	let allUsers = this.findAll();
		// 	let userFound = allUsers.find(oneUser => oneUser[field] === text);
		// 	return userFound;
		// }
		
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
		// generateId => {
		// 	let allUsers = this.findAll();
		// 	let lastUser = allUsers.pop();
		// 	if (lastUser) {
		// 		return lastUser.id + 1;
		// 	}
		// 	return 1;
		// }
		let userToCreate = {
			
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			avatar: req.file.filename
		}

		let userCreated = User.create(userToCreate)

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
	edit: function(req, res)  {
		let pedidoProducto = db.productos.findByPk(req.params.id);
		let pedidoCategorias = db.categorias.findAll();
		console.log(pedidoCategorias)
		Promise.all([pedidoProducto, pedidoCategorias])
		 .then(function([productos, categorias]){
			res.render("editar-producto", {productos:productos,categorias:categorias})
		 })

		 console.log(pedidoCategorias)
        // let idProductoSeleccionado = req.params.id;
        // let productoSeleccionado;

        // for (let p of products){

        //     if(p.id==idProductoSeleccionado){
        //         productoSeleccionado=p;
        //         break;
		// 	}
		// }
		
	
		// 	res.render('editar-producto',{producto: productoSeleccionado});
		},

		update: (req, res) => {
			db.productos.update(
				{ 
					nombre:  req.body.nombre,
					precio:  req.body.precio,
					descripcion: req.body.descripcion,
					blend: req.body.blend,
					cosecha: req.body.cosecha,
					volumen: req.body.volumen,
					stock: req.body.stock,
					img: req.body.file
		
				}, {where: {id : req.params.id}}
					)
				.then((resultados)  => { 
				res.redirect('/detail/' + req.params.id);
				 });
			
			// let idProductoSeleccionado = req.params.id;
			

			// for (let p of products){
			// 	if(p.id==idProductoSeleccionado){
			// 		productoSeleccionado=p;
			// 		fs.unlink(path.join(__dirname, '../../public/img/' + p.image), (error) => {
			// 			(console.log(error))
					
			// 		});
			// 		p.name = req.body.name;
			// 		p.price = req.body.price;
			// 		p.description = req.body.description;
			// 		p.image = req.body.image;
					
			// 		break;
			// 	}
			// }
			
	
			// fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));

			
	
			// res.redirect('/');
	
		},
		destroy : (req, res) => {
			db.productos.destroy({
				where : {
					id: req.params.id
				}
			})
			.then(
				res.redirect("/producto")
			)

		// 	let idProductoSeleccionado = req.params.id;
        // 	let productoSeleccionado;

        // 	for (let p of products){

        //     if(p.id==idProductoSeleccionado){
        //         productoSeleccionado=p;
        //         break;
        //     }
        // }
			
		// 	let products2 = products.filter(function(element){
				
		// 		return element.id!=idProductoSeleccionado;
		// 	})
		// 	fs.unlink(path.join(__dirname, '../../public/img/' + productoSeleccionado.image), (error) => {
		// 		(console.log(error))
			
		// 	});

		// 	fs.writeFileSync(productsFilePath, JSON.stringify(products2,null,' '));
	
		// 	res.redirect('/');
	
	
		},
		
		store: (req, res) => {
			db.categorias.findAll()
			.then(
    		db.productos.create(
    	{ 
			nombre:  req.body.nombre,
			precio:  req.body.precio,
			descripcion: req.body.descripcion,
			blend: req.body.blend,
			cosecha: req.body.cosecha,
			volumen: req.body.volumen,
			stock: req.body.stock,
			

    	}
   	 	))
    	.then((resultados)  => { 
        res.redirect('/producto');
     	});


    	},
	
		
	
	
}

module.exports = controller;