var map = initialize();

// //insialize the map
function initialize() {
  return new google.maps.Map(document.getElementById("map"), {
    // center: new google.maps.LatLng(location.lat, location.lng),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
}

country = window.location.pathname.split("/").pop();

$(window).on("load", function () {
  $.ajax({
    type: "GET",
    url: `http://localhost:3000/api/maps/coordinates/${country}`,
    success: function (response) {
      map.setCenter(
        new google.maps.LatLng(response.location.lat, response.location.lng)
      );
    },
  }).done;
});

function setPoint(element) {
  geoLocation = {
    lat: parseFloat(element.attr("lat")),
    lng: parseFloat(element.attr("lng")),
  };
  var image = {
    url: "http://www.homedepot.com/catalog/swatchImages/35/04/04a604de-8b52-4cd8-a394-6286f00b438d_35.jpg",
    size: new google.maps.Size(35, 40),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 35),
  };

  new google.maps.Marker({
    position: geoLocation,
    map: map,
    draggable: true,
    icon: image,
    label: {
      text: element.attr("price") + "$",
      color: "white",
      fontSize: "15px",
      fontWeight: "bold",
    },
  });
}

google.maps.event.addListenerOnce(map, "idle", function () {
  $(".property").each(function () {
    setPoint($(this));
  });
});

$(".property").on("click", function () {
  $.ajax({
    type: "GET",
    url: `http://localhost:3000/api/properties/` + $(this).attr("id"),
    success: function (response) {
      $(".popup-overlay").addClass("active");
      $("#property-name").append(response.name);
      $("#rating").append(response.rating);
      $("#location").append(
        "Address: " + response.address + ", " + response.country
      );
      $("#property-img").append(
        '<img class="popup-img" src="' + response.propertyImageLink + '"/>'
      );
      response;
    },
  }).done;
});

// $(".property").on("click", () => {

//   $(".popup-overlay").addClass("active");
//   $("#host-name").append("barbar");
// });

// $(".property").on("mouseover", () => {
//   geoLocation = { lat: $(this).attr("lat"), lng: $(this).attr("lng") };
//   console.log($(this));
//   map.setCenter(
//     new google.maps.LatLng({
//       lat: $(this).attr("lat"),
//       lng: $(this).attr("lng"),
//     })
//   );
// });
