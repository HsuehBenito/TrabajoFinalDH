function ventasData(sequelize, Datatypes){

    let alias = 'ventas';
    
    let cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      fecha_venta: {type: Datatypes.DATE},
      total: {type: Datatypes.FLOAT(255)},
      nombre: {type: Datatypes.STRING(255)},
      email: {type: Datatypes.STRING(10)},
      direccion: {type: Datatypes.STRING(255)},
      detalle: {type: Datatypes.STRING(255)},
    }
    
    let config = {tableName: "ventas", camelCase: false, timestamps: false};
    
    const ventas = sequelize.define(alias,cols,config)
    
    ventas.associate = function (modelos){
    
      ventas.belongsToMany(modelos.productos, {
            as: "ventas",
            through: "ventas_productos",   // tabla intermedia
            foreignKey: "id_ventas",  // es el FK del modelo en el que estas (en la tabla intermedia de la bd)
            otherKey: "id_productos",  // es el FK del otro modelo (en la tabla intermedia de la bd)
            timestamps: false
      });
    
    
    }
    
    
    return ventas;
    
    }
    module.exports = ventasData;