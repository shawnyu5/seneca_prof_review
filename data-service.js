require("dotenv").config()
const Sequelize = require('sequelize');

// var sequelize = new Sequelize('database', 'user', 'password',
let sequelize = new Sequelize(
    process.env.DB_Database,
    process.env.DB_User,
    process.env.DB_Password,
    {
        host: 'localhost',
        dialect: 'postgres',
        port: process.env.DB_Port,
        dialectOptions: {
            ssl: { rejectUnauthorized: false }
        },
        query: { raw: true }
    });

