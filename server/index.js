import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import express from "express"
import mongoose from "mongoose"
import morgan from "morgan"
import allRoutes from "./routes/index.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/api", allRoutes)

app.use((err, req, res, next) => {
	res.status(404).json("Something went wrong try again later")
})

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
		console.log(`Connected to mongoDB`)
	} catch (err) {
		console.log(err)
	}
}

connectDB()

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})
