import express from "express";
import { addTask, allTasks, deleteTask, specificTask, updateTask } from "../controllers/taskController.js";
import authProtect from "../middleware/authProtect.js";

const taskRoute=express.Router();

taskRoute.get("/",authProtect,allTasks)
taskRoute.get("/:id",authProtect,specificTask)
taskRoute.post("/",authProtect,addTask);
taskRoute.put('/:id',authProtect,updateTask);
taskRoute.delete("/:id",authProtect,deleteTask);


export default taskRoute;