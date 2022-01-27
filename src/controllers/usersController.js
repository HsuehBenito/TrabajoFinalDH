const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productosBaseDatos.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


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
					p.name = datos.name;
					p.price = datos.price;
					p.description = datos.description;
					break;
				}
			}
			
	
			fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));
	
			res.redirect('/');
	
		},
		destroy : (req, res) => {

			let idProductoSeleccionado = req.params.id;
	
			let products2 = products.filter(function(element){
				return element.id!=idProductoSeleccionado;
			})
	
			fs.writeFileSync(productsFilePath, JSON.stringify(products2,null,' '));
	
			res.redirect('/');
	
	
		}
};

module.exports = controller;
