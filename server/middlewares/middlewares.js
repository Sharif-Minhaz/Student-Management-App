const express = require("express");
const cors = require("cors");

const middlewares = [cors(), express.json(), express.urlencoded({ extended: true })];

module.exports = (app) => {
	app.use(middlewares);
};
