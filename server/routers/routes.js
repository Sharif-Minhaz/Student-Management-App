const homeRoute = require("./home.route");
const authRoute = require("./auth.route");
const profileRoute = require("./profile.route");
const userRoute = require("./user.route");

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
	{
		path: "/students",
		handler: userRoute,
	},
];

module.exports = (app) => {
	routers.forEach((router) => {
		app.use(router.path, router.handler);
	});
};
