
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

//insialize the map
function initialize() {
  var map = new google.maps.Map(
    document.getElementById("map"), {
      center: new google.maps.LatLng(32.1130671, 34.8253722),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  var image = {
          url: 'http://www.homedepot.com/catalog/swatchImages/35/04/04a604de-8b52-4cd8-a394-6286f00b438d_35.jpg',
          // This marker is 35 pixels wide by 35 pixels high.
          size: new google.maps.Size(35, 35),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 35)
        };
  var clickMarker = new google.maps.Marker({
    position: map.getCenter(),
    map: map,
    draggable: true,
    icon: image,
    label: {
      text: "684€",
      color: 'white',
      fontSize: '15px',
      fontWeight: 'bold'
    }
  });
}
google.maps.event.addDomListener(window, "load", initialize);


formBtn.addEventListener('click', () =>{
  loginForm.classList.add('active');
});

formClose.addEventListener('click', () =>{
  loginForm.classList.remove('active');
});

$(function(){

  var $propertyname = $('#propertyname');
  var $propertydescription = $('#propertydescription');
  var $propertyprice = $('#propertyprice');
  var $propertyrating = $('#propertyrating');
  

  
  $.ajax({
    type: 'GET',
    url: '/api/properties',
    success: function(data){
      $propertyname.append('<p><span>' + data[0].name + '</span></p>');
      $propertydescription.append('<h6>' + data[0].description + '</h6>');
      $propertyprice.append('<span>' + data[0].daily_price + '</span>');
      $propertyrating.append('<span><i><strong>' + data[0].rating + '</strong></i></span>');
      $("#propertyimage").attr('src', data[0].propertyImageLink);
    }
  });
});