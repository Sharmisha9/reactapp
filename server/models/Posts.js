module.exports = (sequelize, DataTypes) => {                   //fun create modules and export (var, obj ,fn) from this file so you can has access in other files

    const Posts = sequelize.define("Posts", {                //posts is table name
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",  //deletes every single comment related to post
        })
    }
    return Posts;

};