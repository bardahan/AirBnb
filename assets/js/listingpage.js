
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

//insialize the map
var map_parameters = { center: {lat: 47.490, lng: -117.585}, zoom: 8 };
var map = new google.maps.Map(document.getElementById('map'), map_parameters);


formBtn.addEventListener('click', () =>{
  loginForm.classList.add('active');
});

formClose.addEventListener('click', () =>{
  loginForm.classList.remove('active');
});

var propertyname = document.getElementById('propertyname');
var propertyservices = document.getElementById('propertyservices');
var propertyprice = document.getElementById('propertyprice');
var propertydestription = document.getElementById('propertydestription');


$.ajax({
    url: 'http://localhost:3000/property',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log(data);
            propertyname.innerHTML = data[0].propertyname
        }
    }
);