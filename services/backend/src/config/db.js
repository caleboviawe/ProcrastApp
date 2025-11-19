const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'db',
        dialect: 'postgres',
        logging: false
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('db connected successfully');
    } catch (error) {
        console.error('unable to connect to db:', error);
    }
};

module.exports = { sequelize, connectDB };
