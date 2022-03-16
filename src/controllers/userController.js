const bcryptjs = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const {
	validationResult
} = require('express-validator');


//const User = require('../database/modelos-user/User.js');
//const productsFilePath = path.join(__dirname, '../database/productosBaseDatos.json');
const db = require('../database/models/');
//const { generateId } = require('../database/modelos-user/User');
const controller = {
	login: (req, res) => {
		return res.render('login');
	},
	loginProcess: (req, res) => {
		let userToLogin = db.administrador.findOne({where:{email: req.body.email}})
		.then((userToLogin) => {
            console.log(userToLogin)
		console.log(userToLogin.password)
        
		
		if(userToLogin) {
			let okPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
				if (okPassword){
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
		});});
	},
	register: (req, res) => {
		return res.render('formulario');
	},
	processRegister: function(req,res){
		let p = bcryptjs.hashSync(req.body.password, 10)
		console.log(req.body.password)
		console.log(p)

		db.administrador.create({
				nombre_completo : req.body.nombre_completo,
				email: req.body.email,
				password : p,
				telefono: req.body.telefono,
				foto_perfil: req.file.filename
		});
			return res.redirect('/user/login');

	
			
	
		

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
		
		// let userInDB = db.administrador.findAll

		// if (userInDB) {
		// 	return res.render('formulario', {
		// 		errors: {
		// 			email: {
		// 				msg: 'Este email ya está registrado'
		// 			}
		// 		},
		// 		oldData: req.body
		// 	});
		//}

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
		let pedidoCategorias = db.categorias.findAll()
		let pedidoProducto = db.productos.findAll()
		let pedidoAdmnistrador = db.administrador.findAll()
		Promise.all([pedidoProducto, pedidoCategorias,pedidoAdmnistrador])
		.then(function([productos, categorias,administrador]){
			return res.render('crear-producto', {categorias : categorias, productos: productos, administrador:administrador})

		})
	},
	edit: function(req, res)  {
		let pedidoProducto = db.productos.findByPk(req.params.id);
		let pedidoCategorias = db.categorias.findAll();
		
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
			categorias: req.body.categorias
			

    	}
   	 	))
    	.then((resultados)  => { 
        res.render('producto');
     	});


    	},
	
		
	
	
}

module.exports = controller;