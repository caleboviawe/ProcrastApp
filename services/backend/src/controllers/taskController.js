const User = require("../models/User");
const Task = require("../models/Task");
const Document = require("../models/Document");

const getAllUserTasks = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.findAll({
            where: { user_id: userId },
        });
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

const updateUserTask = async (req, res, next) => {
    const taskId = req.params.id;

    const { title, description, status_id, category_id, due_date, status, has_document } = req.body;

    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.user_id !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to update this task",
            });
        }
        
        task.title = title || task.title;
        task.description = description || task.description;
        task.status_id = status_id || task.status_id;
        task.category_id = category_id || task.category_id;
        task.due_date = due_date || task.due_date;
        task.updated_at = new Date();
        task.status = status || task.status;
        if (has_document !== undefined) task.has_document = has_document;


        await task.save();
        res.json({ message: "Task updated successfully", task });
    } catch (error) {
        next(error);
    }
};

const deleteUserTask = async (req, res, next) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.user_id !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this task",
            });
        }

        await task.destroy();
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const addUserTask = async (req, res, next) => {
    const { title, description, status_id, category_id, due_date, has_document } = req.body;

    try {
        if (req.user.id == null) {
            return res.status(400).json({ message: "Invalid user" });
        }
        const newTask = await Task.create({
            title,
            description,
            status_id,
            category_id,
            due_date,
            user_id: req.user.id,
            has_document
        });

        res.status(201).json({ message: "Task created successfully", newTask });
    } catch (error) {
        next(error);
    }
};

// Get or create a document for a task
const getTaskDocument = async (req, res, next) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.user_id !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        // If task already has a document, return it
        if (task.document_id) {
            const doc = await Document.findByPk(task.document_id);
            if (doc) {
                return res.json({ document_id: doc.id });
            }
        }

        // Create new document for this task
        const newDoc = await Document.create({
            user_id: req.user.id,
            title: task.title,
            content: "",
            due_date: task.due_date,
        });

        // Link document to task
        task.document_id = newDoc.id;
        task.has_document = true;
        await task.save();

        res.status(201).json({ document_id: newDoc.id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUserTasks,
    updateUserTask,
    deleteUserTask,
    addUserTask,
    getTaskDocument,
};
