function categoriasData(sequelize, Datatypes){

    alias = 'categorias';
    
    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      id_productos:{type: Datatypes.INTEGER},
      nombre: {type: Datatypes.STRING(255)},
    }
    
    config = {camelCase: false, timestamps: false}; 
    
    const categorias = sequelize.define(alias,cols,config)
    
    categorias.associate = function (modelos){
    
        categorias.belongsToMany(modelos.productos, {   
            as: "productos",
            foreignKey: "id_productos"
          });
    }
    
    
    return categorias;
    
    }
    module.exports = categoriasData;