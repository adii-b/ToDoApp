import { Navigate, Outlet } from "react-router-dom"
import Auth from "../pages/Auth"

function PrivateRoutes() {
	const auth = false

	if (auth === undefined) return `loading...`

	return auth === true ? <Outlet></Outlet> : <Navigate to={<Auth />} />
}

export default PrivateRoutes
