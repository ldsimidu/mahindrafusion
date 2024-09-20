const headerContainer = document.getElementById('header');

fetch('assets/components/header.html')
  .then(response => response.text())
  .then(data => {
    headerContainer.innerHTML = data;
  })
  .catch(error => {
    console.error('Erro ao carregar a header:', error);
  });


const squares = document.querySelectorAll('.square');

squares.forEach(square => {
    square.addEventListener('click', () => {
        square.style.backgroundColor = square.style.backgroundColor === 'red' ? '#007bff' : 'red';
    });
});
  