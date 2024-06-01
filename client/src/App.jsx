import React from "react"
import { Toaster } from "react-hot-toast"
import { Route, Routes } from "react-router-dom"
import PrivateRoutes from "./components/PrivateRoutes"
import Auth from "./pages/Auth"
import EditProfile from "./pages/EditProfile"
import Home from "./pages/Home"

function App() {
	return (
		<React.Fragment>
			<Toaster
				position="top-right"
				toastOptions={{ style: { fontSize: "2rem" } }}
			/>
			<Routes>
				<Route element={<PrivateRoutes />}>
					<Route path="/" element={<Home />} />
					<Route path="/edit-profile" element={<EditProfile />} />
				</Route>
				<Route path="/auth" element={<Auth />} />
			</Routes>
		</React.Fragment>
	)
}

export default App
