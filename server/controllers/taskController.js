const Task = require("../models/task");

async function createTask(req, res) {
  try {
    let assignee;
    // Only admins can assign tasks to others
    if (req.user.role === "admin") {
      if (req.body.assignee === "") {
        return res.status(400).json({ error: "Assignee is required" });
      }
      assignee = req.body.assignee;
    } else {
      assignee = req.user.id; // normal user can only assign to self
    }
    const task = new Task({
      ...req.body,
      assignee,
    });
    await task.save();
    return res.status(201).json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllTasks(req, res) {
  try {
    const tasks = await Task.find();
    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function getTaskById(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    if (req.user.role !== "admin" && task.assignee.toString() !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }
    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getTasks(req, res) {
  try {
    const { search, status, priority, sort, page = 1, limit = 10 } = req.query;

    const query = {};

    if (req.user.role !== "admin") {
      query.assignee = req.user.id;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (status) query.status = status;

    if (priority) query.priority = priority;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    let sortOption = {};
    
    if (sort) {
      const direction = sort.startsWith("-") ? -1 : 1;
      const field = sort.replace("-", "");
      sortOption[field] = direction;
    }

    const tasks = await Task.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit))
      .populate("assignee", "name email");

    const total = await Task.countDocuments(query);

    res.json({
      tasks,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    if (req.user.role !== "admin" && task.assignee.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not allowed to update this task" });
    }
    const allowedUpdates = [
      "title",
      "description",
      "status",
      "priority",
      "dueDate",
      "tags",
    ];
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        task[field] = req.body[field];
      }
    });
    await task.save();
    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Not found" });
    if (req.user.role !== "admin" && task.assignee.toString() !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }
    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getAllTasks,
  getTaskById,
};
