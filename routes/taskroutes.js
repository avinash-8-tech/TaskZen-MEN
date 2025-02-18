const express = require("express");
const Task = require("../models/task");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/add", async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        const task = new Task({ title, description, dueDate });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to add task" });
    }
});

router.patch("/toggle/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        task.completed = !task.completed;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: "Failed to update task" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete task" });
    }
});

module.exports = router;
