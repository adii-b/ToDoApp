import Task from "../models/Task.js"

export async function createTask(req, res, next) {
	try {
		const task = new Task({
			title: req.body.title,
			user: req.user.id,
			completed: req.body.completed,
		})
		const newTask = await task.save()
		return res.status(201).json(newTask)
	} catch (err) {
		return res.status(500).json("Server error")
	}
}

export async function getAllTasks(req, res, next) {
	try {
		const tasks = await Task.find({})
		return res.status(200).json(tasks)
	} catch (err) {
		return res.status(500).json("Server error")
	}
}

export async function getCurrentUserTasks(req, res, next) {
	try {
		const tasks = await Task.find({ user: req.user.id })
		return res.status(200).json(tasks)
	} catch (err) {
		return res.status(500).json("Server error")
	}
}

export async function updateTask(req, res, next) {
	try {
		const id = req.params.taskId
		const task = await Task.findById(id).exec()
		if (!task) return res.status(404).json("Task not found")
		if (task.user.toString() !== req.user.id)
			return res.status(500).json("You cannot update this task")

		const updatedTask = await Task.findByIdAndUpdate(
			id,
			{
				title: req.body.title,
				completed: req.body.completed,
			},
			{ new: true }
		)

		res.status(200).json(updatedTask)
	} catch (error) {
		res.status(500).json("Server error")
	}
}

export async function deleteTask(req, res, next) {
	try {
		const id = req.params.taskId
		const task = await Task.findById(id).exec()
		if (!task) return res.status(404).json("Task not found")
		if (task.user.toString() !== req.user.id)
			return res.status(500).json("You cannot update this task")

		await Task.findByIdAndDelete(id)
		return res.status(200).json({ msg: "Task deleted" })
	} catch (error) {
		res.status(500).json("Server error")
	}
}
