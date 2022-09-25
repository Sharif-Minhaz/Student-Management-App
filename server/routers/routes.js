const homeRoute = require("./home.route");

const routers = [
	{
		path: "/",
		handler: homeRoute,
	},
];

module.exports = (app) => {
	routers.map((router) => {
		app.use(router.path, router.handler);
	});
};
