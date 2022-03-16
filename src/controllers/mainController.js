const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../database/productosBaseDatos.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const db = require('../database/models/')
const controller = {
	home: (req, res) => {
		res.render('home');
		
	},

	detail: (req, res) => {
        db.productos.findByPk(req.params.id, {
            include: [{association: "categorias"}]
        })
        
        .then(function(producto){
            
            res.render('detail',{producto: producto})
        })

        // let idProductoSeleccionado = req.params.id;
        // let productoSeleccionado;

        // for (let p of products){

        //     if(p.id==idProductoSeleccionado){
        //         productoSeleccionado=p;
        //         break;
        //     }
        // }

        // res.render('detail',{producto: productoSeleccionado});
    },
    
    index: (req, res) => {

        db.productos.findAll()
        .then((productos) =>{

            let listaProductos=[];

            for (p of productos){

                
                let objaux={
                    id: p.id,
                    nombre:  p.nombre,
                    precio:  p.precio,
                    descripcion: p.descripcion,
                    blend: p.blend,
                    cosecha: p.cosecha,
                    
                }

                listaProductos.push(objaux);

            }

            console.log("ver: ", listaProductos);

            res.render('producto',{listaProductos: listaProductos});
            
        }).catch(error => {
            console.log(error)
        });
        


    },
	
};

module.exports = controller;