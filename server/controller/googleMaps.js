var { Client } = require("@googlemaps/google-maps-services-js");

const key = "AIzaSyABWXDrih1XAH_o9xBRCfk4Sx-E5eBsx04";

const client = new Client();

exports.getGeoCodeByAddress = async (address) => {
  res = client
    .geocode({
      params: {
        address: address,
        key: key,
      },
      timeout: 1000,
    })
    .then((r) => {
      //   console.log(r.data.results[0].geometry.location);
      return r.data.results[0].geometry.location;
    })
    .catch((e) => {
      console.log(e.response.data.error_message);
    });
  return res;
};

exports.getGeoCodeByAddressApi = async (req, res) => {
  const address = req.params.address;
  location = await this.getGeoCodeByAddress(address);
  res.send({ location });
};

// exports.mapInit = (country) => {
//   // const centerGeoCode = getGeoCodeByAddress(country);
//   console.log("centerGeoCode");
//   var map = new google.maps.Map(document.getElementById("map"), {
//     center: new google.maps.LatLng(1, 1),
//     zoom: 13,
//     mapTypeId: google.maps.MapTypeId.ROADMAP,
//   });
//   var image = {
//     url: "http://www.homedepot.com/catalog/swatchImages/35/04/04a604de-8b52-4cd8-a394-6286f00b438d_35.jpg",
//     // This marker is 35 pixels wide by 35 pixels high.
//     size: new google.maps.Size(35, 35),
//     // The origin for this image is (0, 0).
//     origin: new google.maps.Point(0, 0),
//     // The anchor for this image is the base of the flagpole at (0, 32).
//     anchor: new google.maps.Point(0, 35),
//   };
// };
