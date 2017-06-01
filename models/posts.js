/**
 * Created by Gee on 3/5/2017.
 */
"use strict"

module.exports = function(sequelize, DataTypes) {
    var Posts = sequelize.define("Posts", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.TEXT
        },
        tags: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'posts',
        timestamps: true
    });

    return Posts;
};
