const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Document = sequelize.define('Document', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Untitled"
    },
    content: {
        type: DataTypes.TEXT,
        defaultValue: ""
    },
    total_time_spent: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'documents',
    timestamps: true,
    underscored: true
});

// this is for user auth
User.hasMany(Document, { foreignKey: 'user_id' });
Document.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Document;
