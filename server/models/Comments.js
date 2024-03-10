module.exports = (sequelize, DataTypes) => {                   //fun create modules and export (var, obj ,fn) from this file so you can has access in other files

    const Comments = sequelize.define("Comments", {                //posts is table name
        commentBody: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }

    });
    return Comments;

};