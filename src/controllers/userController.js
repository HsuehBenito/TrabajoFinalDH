const bcryptjs = require('bcryptjs');
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
const {
	validationResult
} = require('express-validator');

const db = require('../database/models/');

const controller = {
	login: (req, res) => {
		return res.render('login');
	},
	loginProcess: (req, res) => {
		let userToLogin = db.administrador.findOne({where:{email: req.body.email}})
		.then((userToLogin) => {
        //     console.log(userToLogin)
		// console.log(userToLogin.password)
        
		
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
		else{
		return res.render('login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});}});
	},
	register: (req, res) => {
		return res.render('formulario');
	},
	processRegister: function(req,res){
		const resultValidation = validationResult(req)
		let p = bcryptjs.hashSync(req.body.password, 10)
		
		if (resultValidation.errors.length > 0) {
			return res.render('formulario', {
				errors: resultValidation.mapped(),
				oldData: req.body
				
			});
			
		}else{
		db.administrador.create({
				nombre_completo : req.body.nombre_completo,
				email: req.body.email,
				password : p,
				telefono: req.body.telefono,
				foto_perfil: req.file.filename
		});
		
		
			return res.redirect('/user/login');}

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
		let pedidoCategorias = db.categorias.findAll()
		let pedidoAdmnistrador = db.administrador.findAll()
        let pedidoProducto =  db.productos.findByPk(req.params.id)
        Promise.all([pedidoProducto, pedidoCategorias,pedidoAdmnistrador])
		.then(function([productos, categorias,administrador]){
			return res.render('editar-producto', {categorias : categorias, producto: productos, administrador:administrador})
		})
	
        
		},

		update: async (req, res) => {
			let productoSeleccionado = await db.productos.findOne({where:{id: req.params.id}})
			db.productos.update(
				{ 	
					id : req.params.id,
					nombre:  req.body.nombre,
					precio:  req.body.precio,
					descripcion: req.body.descripcion,
					blend: req.body.blend,
					cosecha: req.body.cosecha,
					volumen: req.body.volumen,
					stock: req.body.stock,
					id_categorias: req.body.categorias,
					img: req.file.filename,
					id_administrador: req.body.administrador,
		
				}, {where: {id : req.params.id}})
				.then((resultados)  => { 
					fs.unlink(path.join(__dirname, '../../public/img/' + productoSeleccionado.img),(error) => {
						(console.log(error))
						});
				 })

				 .then(res.render("home"));
			
		},
		destroy : async (req, res) => {
			
			let productoSeleccionado = await db.productos.findOne({where:{id: req.params.id}})
				
			db.productos.destroy({
				where : {
					id: req.params.id
				}
			})
			.then((resultados)  => { 
				fs.unlink(path.join(__dirname, '../../public/img/' + productoSeleccionado.img),(error) => {
					(console.log(error))
					});
			 })
			.then(
				res.redirect("/producto")
			)
			
		},
		
		store: (req, res) => {
		
    		db.productos.create(
    	{ 
			nombre:  req.body.nombre,
			precio:  req.body.precio,
			descripcion: req.body.descripcion,
			blend: req.body.blend,
			cosecha: req.body.cosecha,
			volumen: req.body.volumen,
			stock: req.body.stock,
			id_categorias: req.body.categorias,
			img: req.file.filename,
			id_administrador: req.body.administrador,
		})
			.then((resultados)  => { 
				res.render('home');
     	})
    	},
		comprar: (req, res) => {
			
			
			console.log(req.body)
			res.sendStatus(200)
		}
	
		
}
module.exports = controller;