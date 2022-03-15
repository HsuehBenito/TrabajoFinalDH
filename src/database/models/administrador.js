function adminData(sequelize, Datatypes){

    let alias = 'administrador';

    let cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre_completo: {type: Datatypes.STRING(255)},
      email: {type: Datatypes.STRING(255)},
      password: {type: Datatypes.STRING(255)},
      telefono: {type: Datatypes.STRING(255)},
      foto_perfil: {type: Datatypes.STRING(255)},
    }

    let config = {tableName: "administrador", camelCase: false, timestamps: false}; 

    const administrador = sequelize.define(alias,cols,config)

    administrador.associate = function (modelos){

        administrador.hasMany(modelos.productos, {   
        as: "administrador",
        foreignKey: "id_administrador"
      });
    }


    return administrador;

    }
    module.exports = adminData;