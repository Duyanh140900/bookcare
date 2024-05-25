import express from "express";
import {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  displayCRUD,
} from "../controllers/homeController";

import {
  handleLoginUser,
  getUser,
  createUser,
  updateUser,
} from "../controllers/useControler";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/about", getAboutPage);
  router.get("/crud", getCRUD);
  router.post("/post-crud", postCRUD);
  router.post("/get-crud", displayCRUD);

  //rest api
  router.post("/api/login", handleLoginUser);
  router.get("/api/get-user", getUser);
  router.post("/api/create-user", createUser);
  router.post("/api/update-user", updateUser);
  return app.use("/", router);
};

module.exports = initWebRoutes;
