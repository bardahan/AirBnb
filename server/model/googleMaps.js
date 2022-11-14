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
