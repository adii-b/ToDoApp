import Login from "../components/auth/Login"
import Register from "../components/auth/Register"
import classes from "./Auth.module.scss"
import Layout from "./Layout"

function Auth() {
	return (
		<Layout>
			<div className={classes.form_container}>
				<Login />
				<Register />
			</div>
		</Layout>
	)
}

export default Auth
