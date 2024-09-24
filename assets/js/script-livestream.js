// Seleciona o botão e a sidebar
const menuButton = document.querySelector('.navbar-toggler');
const sideBar = document.getElementById('canaisSeguidosCollapse');

// Adiciona evento de clique ao botão do menu
menuButton.addEventListener('click', () => {
    sideBar.classList.toggle('show');
});
