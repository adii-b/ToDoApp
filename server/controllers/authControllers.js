import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

export async function register(req, res) {
	if (!req.body.name || !req.body.email || !req.body.password)
		return res.json("name, email and password required")
	try {
		const salt = await bcryptjs.genSalt(10)
		const hashPassword = await bcryptjs.hash(req.body.password, salt)
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: hashPassword,
		})
		await user.save()
		return res.status(200).json("New user created")
	} catch (err) {
		console.log(err)
		return res.json("Server error")
	}
}

export async function login(req, res) {
	if (!req.body.email || !req.body.password)
		return res.json("Email and password required")
	try {
		const user = await User.findOne({ email: req.body.email })
		if (!user) return res.status(404).json("User not found")
		const decryptedPassword = await bcryptjs.compare(
			req.body.password,
			user.password
		)
		if (!decryptedPassword) return res.json("Password incorrect")
		const payload = {
			id: user._id,
			name: user.name,
		}
		const token = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: "1d",
		})
		return res
			.cookie("access_token", token, {
				httpOnly: true,
			})
			.status(200)
			.json({ msg: "login successful" })
	} catch (err) {
		return res.json("Server error")
	}
}

export function logout(req, res) {
	res.clearCookie("access_token")
	return res.status(200).json({ msg: "User logged out" })
}

export function isLoggedIn(req, res) {
	const token = req.cookies.access_token
	if (!token) return res.json(false)
	return jwt.verify(token, process.env.JWT_SECRET, (err) => {
		if (err) return res.json(false)
		else {
			res.json(true)
		}
	})
}
