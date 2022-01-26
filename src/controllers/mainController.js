const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productosBaseDatos.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//
const controller = {
	home: (req, res) => {
		res.render('home');
		
	},

	producto: (req, res) => {
		
		products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render('producto',{p: products});
	},
	detail: (req, res) => {

        let idProductoSeleccionado = req.params.id;
        let productoSeleccionado;

        for (let p of products){

            if(p.id==idProductoSeleccionado){
                productoSeleccionado=p;
                break;
            }
        }

        res.render('detail',{producto: productoSeleccionado});
    },
	
};

module.exports = controller;
