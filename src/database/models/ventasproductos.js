// function ventas_productosData(sequelize, Datatypes){

//     alias = 'ventas_productos';
    
//     cols = {
//       id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
//       id_productos:{type: Datatypes.INTEGER},
//       id_ventas:{type: Datatypes.INTEGER},
//       cantidad: {type: Datatypes.INTEGER},
//     }
    
//     config = {camelCase: false, timestamps: false}; 
    
//     const ventasproductos = sequelize.define(alias,cols,config)
    
//     ventasproductos.associate = function (modelos){
    
        
    
    
//     }
    
    
//     return ventas_productos;
    
//     }
//     module.exports = ventas_productosData;