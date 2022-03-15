function ventas_productosData(sequelize, Datatypes){

    let alias = 'ventas_productos';
    
    let cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      id_productos:{type: Datatypes.INTEGER},
      id_ventas:{type: Datatypes.INTEGER},
      cantidad: {type: Datatypes.INTEGER},
    }
    
    let config = {tableName: "ventas_productos", camelCase: false, timestamps: false};
    
    const ventas_productos = sequelize.define(alias,cols,config)
    
    ventas_productos.associate = function (modelos){
    
        
    
    
    }
    
    
    return ventas_productos;
    
    }
    module.exports = ventas_productosData;