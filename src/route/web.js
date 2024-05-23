import express from "express";
import {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  displayCRUD,
} from "../controllers/homeController";

import {handleLoginUser} from "../controllers/userController"

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/about", getAboutPage);
  router.get("/crud", getCRUD);
  router.post("/post-crud", postCRUD);
  router.get("/get-crud", displayCRUD);

  //rest api
  router.get("/api/login", handleLoginUser);
  return app.use("/", router);
};

module.exports = initWebRoutes;
