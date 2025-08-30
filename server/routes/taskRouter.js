const express = require("express");
const auth = require("../middleware/auth");
const { createTask, getTasks, updateTask, deleteTask, getAllTasks, getTaskById } = require("../controllers/taskController");


const taskRouter = express.Router();

taskRouter.post("/", auth, createTask);
taskRouter.get("/",auth,getTasks)
taskRouter.put("/:id",auth,updateTask)
taskRouter.delete("/:id",auth,deleteTask)
taskRouter.get("/all", auth, getAllTasks);
taskRouter.get("/:id", auth, getTaskById);  


module.exports = taskRouter;
