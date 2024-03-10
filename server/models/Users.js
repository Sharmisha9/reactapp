module.exports = (sequelize, DataTypes) => {                   //fun create modules and export (var, obj ,fn) from this file so you can has access in other files

    const Users = sequelize.define("Users", {                //posts is table name
        username: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,

        },

    });


    return Users;

};