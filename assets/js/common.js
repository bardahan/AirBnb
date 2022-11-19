
$( document ).ready(function() {
    const formBtn = document.querySelector("#login-btn");
    const registerBtn = document.querySelector(".open-register-from");
    const loginForm = document.querySelector(".login-form-container");
    const registerForm = document.querySelector(".register-form-container");
    const formClose = document.querySelector(".form-close");
    const navbar = document.querySelector(".navbar");
    const videoBtn = document.querySelectorAll(".vid-btn");
    
    window.onscroll = () => {
      navbar.classList.remove("active");
      loginForm.classList.remove("active");
    };
    
    $('.open-register-from').click( () => {
      $('.login-form-container').removeClass('active');
      registerForm.classList.add("active");
    });

    $('.open-login-from').click(()=>{
      $('.register-form-container').removeClass('active');
      $('.login-form-container').addClass('active');

    })
    
    formBtn.addEventListener("click", () => {
      loginForm.classList.add("active");
    });
    

    $('#register-submit-btn').click(function(e){
      e.preventDefault();

      //*******inputs validation*********//
      $('#register-password-input-error').hide('slow');
      $('#register-username-input-error').hide('slow');

      let usernameValidation = validateEmail($('#register-email').val());
      let passwordValidation = $('#register-password').val().length >= 6;

      if(!usernameValidation){
        $('#register-username-input-error').show('slow');
      }

      if(!passwordValidation){
        $('#register-password-input-error').show('slow');
      }

      if(!passwordValidation || !usernameValidation){
        return;
      }
      //*******inputs validation*********//
      let username = $('#register-email').val();
      let password = $('#register-password').val();
      let privileges = $('#register-privileges').val();;
      let data = {username:username,
                  password:password,
                  privileges:privileges};
      $.ajax({
        type: "POST",
        url: "api/users",
        data: data,
        dataType: "json",
        success: function (response) {

          // login
          alert(`Hi ${username} - Registered successfully`);

          //open login modal
          $('.open-login-from').click();
          
        },
        error:function(e){}
      });  
    });
    
    function validateEmail($email) {
      var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailReg.test( $email );
    }
    
    $('.form-close').click( () => {
      loginForm.classList.remove("active");
      registerForm.classList.remove("active");
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
    
});