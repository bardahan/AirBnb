let formBtn = document.querySelector("#login-btn");
let loginForm = document.querySelector(".login-form-container");
let formClose = document.querySelector("#form-close");
let navbar = document.querySelector(".navbar");
let videoBtn = document.querySelectorAll(".vid-btn");

window.onscroll = () => {
  navbar.classList.remove("active");
  loginForm.classList.remove("active");
};

formBtn.addEventListener("click", () => {
  loginForm.classList.add("active");
});

formClose.addEventListener("click", () => {
  loginForm.classList.remove("active");
});

videoBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".controls .active").classList.remove("active");
    btn.classList.add("active");
    let src = btn.getAttribute("data-src");
    document.querySelector("#video-slider").src = src;
  });
});

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".brand-slider", {
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    991: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
});

function setCookie(authHash) {
  var date = new Date();
  date.setDate(date.getDate() + 1);

  document.cookie = "authHash=" + authHash + ";";
  document.cookie = "expires=" + date.toUTCString() + ";";
  // document.cookie = cookieString;
}

function getAuthCookie() {
  const cookie = document.cookie;
  var match = cookie.match(new RegExp("(^| )" + "authHash" + "=([^;]+)"));
  if (match) return match[2];
}

$(".login").submit(function (e) {
  e.preventDefault();
  const username = $("#username").val();
  const password = $("#password").val();
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/api/users/" + username + "/" + password,
    success: function (response) {
      if (response.success == 1) {
        setCookie(response.userId);
        alert("Success :)");
      } else {
        alert("Cannot find username and password combination");
      }
    },
    error: function (response) {
      alert("Cannot find username and password combination");
    },
  }).done;
});

$(window).on("load", () => {
  const authCookie = getAuthCookie();
  if (authCookie) {
    $.ajax({
      type: "GET",
      auth: authCookie,
      url: "http://localhost:3000/api/users/" + authCookie,
      success: function (response) {
        if (response.success == 1) {
          $(".display-username").html(response.username);
          $(".display-username").attr("privileges", response.privileges);
          $(".display-username").attr("userId", this.auth);
          if (response.privileges < 3) {
            $("#admin").show();
          }
        } else {
          alert("Cannot find username and password combination");
        }
      },
      error: function (response) {
        alert("Cannot find username and password combination");
      },
    }).done;
  }
});
