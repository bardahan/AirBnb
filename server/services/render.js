const { default: axios } = require("axios");
const path = require("path");
var { mapInit } = require("../controller/googleMaps");
var { userDetailsByHash } = require("../controller/controller");

const siteUrl = "http://localhost:3000";
const apiUrl = "http://localhost:3000/api";

// function getUserCookieDetails(authHash) {
//   UsersSchema.find({
//     _id: req.params.hash,
//   }).then((user) =>
// }

exports.homeRoute = (req, res) => {
  // console.log(req.cookies.authHash);
  // user = userDetailsByHash(req.cookies.authHash);
  // console.log(user);
  res.render("index", {});
  //   user: { privileges: req.cookies, username: req.cookies },
  // });
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

exports.adminPage = (req, res) => {
  res.render("admin");
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
