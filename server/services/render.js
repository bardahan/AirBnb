const { default: axios } = require("axios");
const path = require("path");

const siteUrl = "http://localhost:3000/airbnb";

exports.homeRoute = (req, res) => {
  res.sendFile(path.join(__dirname, "../../views/index.html"));
  // axios
  //   .get(siteUrl)
  //   .then(function (response) {
  //     console.log("hi");
  //     // console.log(path.join(__dirname, "/views/sample.html"));
  //     // res.sendFile(path.join(__dirname, "/views/sample.html"));
  //   })
  //   .catch((e) => {
  //     // console.log(e);
  //     res.send(e);
  //   });
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
