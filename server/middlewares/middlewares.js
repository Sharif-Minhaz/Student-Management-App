const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const middlewares = [
	cors({ credentials: true, origin: "http://localhost:3000" }),
	cookieParser(),
	express.json({ limit: "50mb" }),
	express.urlencoded({ extended: true, limit: "50mb" }),
];

module.exports = (app) => {
	app.use(middlewares);
};
