import express from "express"
import {
	createTask,
	deleteTask,
	getAllTasks,
	getCurrentUserTasks,
	updateTask,
} from "../controllers/taskController.js"

const router = express.Router()

router.post("/", createTask)
router.get("/all", getAllTasks)
router.get("/mytasks", getCurrentUserTasks)
router.put("/:taskId", updateTask)
router.delete("/:taskId", deleteTask)

export default router
