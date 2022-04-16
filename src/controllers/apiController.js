const { Sequelize } = require('../database/models/');

const db = require('../database/models/')
const Op = db.Sequelize.Op;

const controller = {

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
admin:  (req,res) => {
   db.administrador
   .findAll()
   .then(administrador => {
       return res.status(200).json({
           total: administrador.length,
           data: administrador,
           status:200
       })
   })
},
categorias:  (req,res) => {
    db.categorias
    .findAll()
    .then(categorias => {
        return res.status(200).json({
            total: categorias.length,
            data: categtorias,
            status:200
        })
    })
 },
 ventas: (req,res) => {
    db.ventas
    .create(req.body)
    .then(ventas => {
        return res.status(200).json({
            data: ventas,
            status:200,
            created: 'ok'
        })
    })
 },
}
module.exports = controller;