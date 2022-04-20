const { Sequelize } = require('../database/models/');

const db = require('../database/models/')
const Op = db.Sequelize.Op;

const controller = {

api:  (req,res) => {
    db.productos
   .findAll({include:["categorias","administrador"]})
   .then(productos => {
       return res.status(200).json({
           count: productos.length,
           data: productos.map(producto=>{
               return{
                id: producto.id,
                administrador: {nombre: producto.administrador.nombre_completo},
                nombre: producto.nombre,
                blend: producto.blend,
                cosecha: producto.cosecha,
                precio:  producto.precio,              
                volumen: producto.volumen,
                descripcion: producto.descripcion,
                stock: producto.stock,
                categoria: {nombre: producto.categorias.nombre},
                img:producto.img,
               }
           }),
           status:200
       })
   })
},
// admin:  (req,res) => {
//    db.administrador
//    .findAll()
//    .then(administrador => {
//        return res.status(200).json({
//            total: administrador.length,
//            data: administrador,
//            status:200
//        })
//    })
// },
categorias:  (req,res) => {
    db.categorias
    .findAll()
    .then(categorias => {
        return res.status(200).json({
            total: categorias.length,
            data: categorias.map(categoria=>{
                return{
                 id: categoria.id,
                 nombre: categoria.nombre,
                }
            }),
            status:200
        })
    })
 },
//  ventas: (req,res) => {
//     db.ventas
//     .create(req.body)
//     .then(ventas => {
//         return res.status(200).json({
//             data: ventas,
//             status:200,
//             created: 'ok'
//         })
//     })
//  },
}
module.exports = controller;