const menuButton = document.querySelector('.navbar-toggler');
const sideBar = document.querySelector('.side-bar');

menuButton.addEventListener('click', () => {
    sideBar.classList.toggle('show');
});

document.addEventListener('click', (event) => {
    const isClickInsideMenuButton = menuButton.contains(event.target);
    const isClickInsideSidebar = sideBar.contains(event.target);

    if (!isClickInsideMenuButton && !isClickInsideSidebar) {
        sideBar.classList.remove('show');
    }
});
