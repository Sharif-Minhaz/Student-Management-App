const homeRoute = require("./home.route");
const authRoute = require("./auth.route");
const profileRoute = require("./profile.route");

const routers = [
	{
		path: "/",
		handler: homeRoute,
	},
	{
		path: "/auth",
		handler: authRoute,
	},
	{
		path: "/profile",
		handler: profileRoute,
	},
];

module.exports = (app) => {
	routers.map((router) => {
		app.use(router.path, router.handler);
	});
};
