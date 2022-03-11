function adminData(sequelize, Datatypes){

    alias = 'administrador';

    cols = {
      id: {type: Datatypes.INTEGER, primaryKey: true, autoIncrement: true},
      nombre_completo: {type: Datatypes.STRING(255)},
      email: {type: Datatypes.STRING(255)},
      password: {type: Datatypes.STRING(255)},
      telefono: {type: Datatypes.STRING(255)},
      foto_perfil: {type: Datatypes.STRING(255)},
    }

    config = {camelCase: false, timestamps: false}; 

    const administrador = sequelize.define(alias,cols,config)

    administrador.associate = function (modelos){

        administrador.belongsTo(modelos.productos, {   
        as: "administrador",
        foreignKey: "id_administrador"
      });
    }


    return administrador;

    }
    module.exports = adminData;