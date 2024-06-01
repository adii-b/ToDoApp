import User from "../models/User.js"

export async function getUserInfo(req, res, next) {
	try {
		const data = await User.findById(req.user.id).select("name email")
		return res.status(200).json(data)
	} catch (err) {
		return res.status(404).json("User not found")
	}
}

export async function updateUser(req, res, next) {
	try {
		const updatedUser = await User.findByIdAndUpdate(
			req.user.id,
			{
				name: req.body.name,
				email: req.body.email,
			},
			{
				new: true, // Returns back updated user
			}
		).select("name email")
		return res.status(200).json(updatedUser)
	} catch (err) {
		return req.status(500).json("Server error")
	}
}
