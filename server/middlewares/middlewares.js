const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const middlewares = [
	cors(),
	cookieParser(),
	express.json(),
	express.urlencoded({ extended: true }),
];

module.exports = (app) => {
	app.use(middlewares);
};
