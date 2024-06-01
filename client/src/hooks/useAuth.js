import axios from "axios"
import { useEffect, useState } from "react"

export default () => {
	const [auth, setAuth] = useState()

	useEffect(() => {
		const verifyAuth = async () => {
			try {
				const res = await axios.get("/api/auth/is_logged_in")
				setAuth(res.data)
			} catch (err) {
				console.log(err)
				setAuth(false)
			}
		}
		verifyAuth()
	})
	return { auth }
}
