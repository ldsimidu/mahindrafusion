const headerContainer = document.getElementById('nav');

fetch('../../components/header.html')
    .then(response => response.text())
    .then(data => {
    headerContainer.innerHTML = data;
})
    .catch(error => {
    console.error('Erro ao carregar a header:', error);
});

const footerContainer = document.getElementById('footer');

fetch('../../components/footer.html')
    .then(response => response.text())
    .then(data => {
    footerContainer.innerHTML = data;
})
    .catch(error => {
    console.error('Erro ao carregar o footer:', error);
});

