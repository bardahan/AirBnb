let searchBtn = document.querySelector('#search-btn');
let serchBar = document.querySelector('.search-bar-container');

searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-times');
    serchBar.classList.toggle('active');
});