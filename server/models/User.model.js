const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	primaryName: {
		type: String,
		required: [true, "Primary name is required"],
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
	},
	password: {
		type: String,
		required: true,
	},
});

const User = model("user", userSchema);

module.exports = User;
