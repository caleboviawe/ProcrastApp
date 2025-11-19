const { Sequelize } = require('sequelize');
require('dotenv').config();

// db connection setup
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: 'db', // docker service name
        dialect: 'postgres',
        logging: false // keep logs clean
    }
);

// test the connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('db connected successfully');
    } catch (error) {
        console.error('unable to connect to db:', error);
    }
};

module.exports = { sequelize, connectDB };
