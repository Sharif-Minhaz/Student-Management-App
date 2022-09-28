const homeRoute = require("./home.route");
const authRoute = require("./auth.route");

const routers = [
	{
		path: "/",
		handler: homeRoute,
	},
	{
		path: "/auth",
		handler: authRoute,
	},
];

module.exports = (app) => {
	routers.map((router) => {
		app.use(router.path, router.handler);
	});
};
