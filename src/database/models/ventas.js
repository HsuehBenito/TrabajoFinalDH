function ventasData(sequelize, Datatypes){

    alias = 'ventas';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      created_at: {type: Datatypes.DATE},
      updated_at: {type: Datatypes.DATE},
      fecha_venta: {type: Datatypes.DATE},
      total: {type: Datatypes.FLOAT(255)},
      nombre: {type: Datatypes.STRING(255)},
      email: {type: Datatypes.STRING(10)},
      direccion: {type: Datatypes.STRING(255)},
      detalle: {type: Datatypes.STRING(255)},
    }
    
    config = {camelCase: false, timestamps: false}; 
    
    const ventas = sequelize.define(alias,cols,config)
    
    ventas.associate = function (modelos){
    
      ventas.belongsToMany(modelos.productos, {
            as: "ventas",
            through: "ventasproductos",   // tabla intermedia
            foreignKey: "ventas_id",  // es el FK del modelo en el que estas (en la tabla intermedia de la bd)
            
            timestamps: false
      });
    
    
    }
    
    
    return ventas;
    
    }
    module.exports = ventasData;