
const { Sequelize } = require('../database/models/');

const db = require('../database/models/')
const Op = db.Sequelize.Op;

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
                    img:p.img
                    
                }

                listaProductos.push(objaux);

            }


            res.render('producto',{listaProductos: listaProductos});
            
        }).catch(error => {
            console.log(error)
        });
        


    },
    api:  (req,res) => {
         db.productos
        .findAll()
        .then(productos => {
            return res.status(200).json({
                total: productos.length,
                data: productos,
                status:200
            })
        })
    },
    show:  (req,res) => {
        db.productos
       .findByPk(req.params.id)
       .then(producto => {
           return res.status(200).json({
               data: producto,
               status:200
           })
       })
   }
	
};

module.exports = controller;