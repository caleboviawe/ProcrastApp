const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Task = sequelize.define(
    "Task",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "CASCADE",
        },

        status_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "status",
                key: "id",
            },
            onDelete: "SET NULL",
        },

        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        due_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        has_document: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        document_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "documents",
                key: "id",
            },
            onDelete: "SET NULL",
        },

        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: "not-started",
        },
        category: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: "other",
        },
    },
    {
        tableName: "tasks",
        timestamps: true, // enables createdAt & updatedAt
        underscored: true, // maps createdAt → created_at
    }
);

module.exports = Task;
