const express = require("express");

const services = require("../services/render");
const controller = require("../controller/controller");

function SocketRouter(io) {
  const router = express.Router();

  router.get("/", services.homeRoute);

  router.get("/add-property", services.addProperty);
  router.get("/update-property", services.updateProperty);

  // API
  router.post("/api/properties", controller.create);
  router.get("/api/properties/:id", controller.find);
  router.get("/api/properties", controller.find);
  router.put("/api/properties", controller.update);
  router.delete("/api/properties/:id", controller.delete);

  return router;
}

module.exports = SocketRouter;
