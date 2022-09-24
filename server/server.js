require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const setMiddlewares = require("./middlewares/middlewares");
const setRoutes = require("./routers/routes");

//set middlewares and routes
setMiddlewares(app);
setRoutes(app);

const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
    res.status(404).json("Page not found");
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json("Internal server error");
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.info(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });