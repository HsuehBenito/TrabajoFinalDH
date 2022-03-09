// function productosData(sequelize, Datatypes){

//     alias = 'productos';
    
//     cols = {
//       id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
//       id_administrador:{type: Datatypes.INTEGER},
//       created_at: {type: Datatypes.DATE},
//       updated_at: {type: Datatypes.DATE},
//       nombre: {type: Datatypes.STRING(255)},
//       blend: {type: Datatypes.STRING(255)},
//       cosecha: {type: Datatypes.STRING(255)},
//       precio: {type: Datatypes.FLOAT(10)},
//       volumen: {type: Datatypes.STRING(255)},
//       descripcion: {type: Datatypes.STRING(255)},
//       stock: {type: Datatypes.INTEGER(255)},
//       categorias_id: {type: Datatypes.INTEGER}, 
//     }
    
//     config = {camelCase: false, timestamps: false}; 
    
//     const productos = sequelize.define(alias,cols,config)
    
//     productos.associate = function (modelos){
    
//         productos.belongsTo(modelos.administrador, {   
//         as: "administrador",
//         foreignKey: "id_administrador"
//         });
    
    
      
//       productos.belongsToMany(modelos.ventas, {
//         as: "ventas",
//         through: "ventasproductos",   // tabla intermedia
//         foreignKey: "productos_id",  // es el FK del modelo en el que estas (en la tabla intermedia de la bd)
//         otherKey: "ventas_id",    // es el FK del otro modelo (en la tabla intermedia de la bd)
//         timestamps: false
//        });
    
    
//     }
    
    
//     return productos;
    
//     }
//     module.exports = productosData;