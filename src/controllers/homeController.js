import db from "../models/index";
import { createNewUser, getAllUser } from "../services/CRUDServices";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homePage.ejs", { data: JSON.stringify(data) });
  } catch (e) {
    console.log("errr", e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

const getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

const postCRUD = async (req, res) => {
  console.log(req.body);
  let message = await createNewUser(req.body);
  return res.send(message);
};

const displayCRUD = async (req, res) => {
  let data = await getAllUser();
  console.log("displayCRUD", data);
  return res.render("displayCRUD.ejs", { dataTable: data });
};

module.exports = {
  getHomePage,
  getAboutPage,
  getCRUD,
  postCRUD,
  displayCRUD,
};
