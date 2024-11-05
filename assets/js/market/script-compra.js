const headerContainer = document.getElementById('nav');

fetch('/mahindrafusion/assets/components/header.html')
    .then(response => response.text())
    .then(data => {
    headerContainer.innerHTML = data;
})
    .catch(error => {
    console.error('Erro ao carregar a header:', error);
});

const footerContainer = document.getElementById('footer');

fetch('/mahindrafusion/assets/components/footer.html')
    .then(response => response.text())
    .then(data => {
    footerContainer.innerHTML = data;
})
    .catch(error => {
    console.error('Erro ao carregar o footer:', error);
});

document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('cardName').value;
    const number = document.getElementById('cardNumber').value;
    const expiry = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    if (name && number && expiry && cvv) {
        document.getElementById('paymentMessage').innerText = 'Pagamento realizado com sucesso!';
    } else {
        document.getElementById('paymentMessage').innerText = 'Por favor, preencha todos os campos.';
    }
});