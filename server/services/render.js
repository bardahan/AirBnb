const { default: axios } = require("axios");
const path = require("path");
var { mapInit } = require("../controller/googleMaps");

const siteUrl = "http://localhost:3000";
const apiUrl = "http://localhost:3000/api";

exports.homeRoute = (req, res) => {
  res.render("index", {});
  // axios
  //   .get(siteUrl)
  //   .then(function (response) {
  //     res.render("index", {});
  //   })
  //   .catch((e) => {
  //     res.send(e);
  //   });
};

exports.countryProperty = (req, res) => {
  axios
    .get(apiUrl + "/properties/country/" + req.params.country)
    .then(function (response) {
      res.render("Listingpage", {
        properties: response.data,
      });
    })
    .catch((e) => res.send(e));
};

exports.propertyPage = (req, res) => {
  axios
    .get(apiUrl + "/properties/" + req.params.id)
    .then(function (response) {
      res.render("propertyPage", {
        property: response.data,
      });
    })
    .catch((e) => res.send(e));
};

exports.addProperty = (req, res) => {
  res.render("add_property");
};

exports.updateProperty = (req, res) => {
  axios
    .get(apiUrl, { params: { id: req.query.id } })
    .then(function (propertyData) {
      res.render("update_property", { property: propertyData.data });
    })
    .catch((e) => res.send(e));
};

exports.updateIo = (io) => {
  axios
    .get(apiUrl)
    .then(function (response) {
      io.emit("table_change", response);
      return response;
    })
    .catch((e) => console.log(`error: ${e}`));
};
