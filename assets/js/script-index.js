const headerContainer = document.getElementById('nav');

fetch('../components/header.html')
  .then(response => response.text())
  .then(data => {
    headerContainer.innerHTML = data;
  })
  .catch(error => {
    console.error('Erro ao carregar a header:', error);
  });

const footerContainer = document.getElementById('footer');

fetch('../components/footer.html')
  .then(response => response.text())
  .then(data => {
    footerContainer.innerHTML = data;
  })
  .catch(error => {
    console.error('Erro ao carregar o footer:', error);
  });


document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const newsItems = document.querySelectorAll('.news-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            newsItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});