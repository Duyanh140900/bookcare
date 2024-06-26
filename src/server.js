import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
require("dotenv").config();
var cors = require("cors");

let app = express();

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8069;
app.listen(port, () => {
  console.log("backend node js is running port: ", port);
});
