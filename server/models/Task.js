import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		completed: {
			type: Boolean,
			required: false,
			default: false,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true } // Created at and updated At
)

export default mongoose.model("Task", taskSchema)
