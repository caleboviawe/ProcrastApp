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

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "user_id",
            references: {
                model: "users",
                key: "id",
            },
            onDelete: "CASCADE",
        },

        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "category_id",
            references: {
                model: "categories",
                key: "id",
            },
            onDelete: "SET NULL",
        },

        statusId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: "status_id",
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

        dueDate: {
            type: DataTypes.DATE,
            allowNull: true,
            field: "due_date",
        },
    },
    {
        tableName: "tasks",
        timestamps: true, // enables createdAt & updatedAt
        underscored: true, // maps createdAt → created_at
    }
);

module.exports = Task;
