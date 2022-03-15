function categoriasData(sequelize, Datatypes){

    let alias = 'categorias';

    let cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre: {type: Datatypes.STRING(255)},
    }

    let config = {tableName: "categorias", camelCase: false, timestamps: false}; 

    const categorias = sequelize.define(alias,cols,config)

    categorias.associate = function (modelos){

        categorias.hasMany(modelos.productos, {   
            as: "productos",
            foreignKey: "id_categorias"
          });
    }


    return categorias;

    }
    module.exports = categoriasData;