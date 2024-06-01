import jwt from "jsonwebtoken"

export function checkAuth(req, res, next) {
	const token = req.cookies.access_token
	if (!token) return res.json("No token available")
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) return res.json("Invalid token")
		else {
			req.user = decoded
			return next()
		}
	})
}
