const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	primaryName: {
		type: String,
		required: [true, "Primary name is required"],
		trim: true
	},
	profile: {
		type: Schema.Types.ObjectId,
		ref: "profile",
	},
	courses: [
		{
			type: Schema.Types.ObjectId,
			ref: "course",
		},
	],
	userId: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	role: {
		type: String,
		default: "student",
	},
});

const User = model("user", userSchema);

module.exports = User;
