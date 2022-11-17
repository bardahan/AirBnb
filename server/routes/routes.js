const express = require("express");

const services = require("../services/render");
const controller = require("../controller/controller");

function SocketRouter(io) {
  const router = express.Router();

  router.get("/", services.homeRoute);
  router.get("/listProperty/:country", services.countryProperty);

  router.get("/add-property", services.addProperty);
  router.get("/update-property", services.updateProperty);

  // API
  // Properties
  router.post("/api/properties", controller.create);
  router.get("/api/properties/country/:country", controller.findByCountry);
  router.get("/api/properties/search", controller.searchProperty);
  router.get("/api/properties/:id", controller.find);
  router.get("/api/properties", controller.find);
  router.put("/api/properties", controller.update);
  router.delete("/api/properties/:id", controller.delete);

  // Users
  router.post("/api/users", controller.createUser);
  router.get("/api/users/:username/:password", controller.authentcateUser);
  router.delete("/api/users/:username", controller.deleteUser);

  // Charges
  router.post("/api/charges", controller.createCharge);
  router.get("/api/charges", controller.findCharges);
  router.delete("/api/charges/:id", controller.deleteCharge);

  return router;
}

module.exports = SocketRouter;
