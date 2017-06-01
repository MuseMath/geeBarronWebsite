/**
 * Created by Gee on 3/5/2017.
 */
"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var sequelize = new Sequelize('geeweb', "postgres", "hh00ttyy", {
    // host: process.env.POSTGRESQL_LOCAL_HOST,
    dialect: 'postgres',
    dialectOptions: {
        ssl: false
    },
    define: {
        timestamps: false
    },
    freezeTableName: true,
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});

var db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Models/tables
db.posts = require('../models/posts')(sequelize, Sequelize);


db.sequelize.sync({
    searchPath: 'public',
    force: false
}).catch(function(err) {
    db.sequelize.dropSchema('public');
    throw err;
});


module.exports = db;