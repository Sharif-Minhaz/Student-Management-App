const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	primaryName: {
		type: String,
		required: true,
	},
	profile: {
		type: Schema.Types.ObjectId,
		ref: "Profile",
	},
	courses: [
		{
			type: Schema.Types.ObjectId,
			ref: "Course",
		},
	],
	userId: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const User = model("user", userSchema);

module.exports = User;
