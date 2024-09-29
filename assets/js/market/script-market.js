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


const products = [
    { name: 'Smartphone', category: 'eletronicos', price: 1200, image: 'https://via.placeholder.com/300x200.png?text=Smartphone' },
    { name: 'Laptop', category: 'eletronicos', price: 3500, image: 'https://via.placeholder.com/300x200.png?text=Laptop' },
    { name: 'Livro: O Senhor dos Anéis', category: 'livros', price: 50, image: 'https://via.placeholder.com/300x200.png?text=Livro' },
    { name: 'Camiseta Polo', category: 'moda', price: 100, image: 'https://via.placeholder.com/300x200.png?text=Camiseta' },
    { name: 'Fone de Ouvido', category: 'eletronicos', price: 200, image: 'https://via.placeholder.com/300x200.png?text=Fone+de+Ouvido' },
    { name: 'Livro: A Revolução dos Bichos', category: 'livros', price: 40, image: 'https://via.placeholder.com/300x200.png?text=Livro' },
    { name: 'Jaqueta de Couro', category: 'moda', price: 300, image: 'https://via.placeholder.com/300x200.png?text=Jaqueta+de+Couro' }
];

const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search');
const priceRange = document.getElementById('priceRange');
const filters = {
    category: [],
    searchTerm: '',
    maxPrice: 5000
};

function renderProducts() {
    const filteredProducts = products.filter(product => {
        const matchesCategory = filters.category.length === 0 || filters.category.includes(product.category);
        const matchesSearchTerm = product.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
        const matchesPrice = product.price <= filters.maxPrice;
        return matchesCategory && matchesSearchTerm && matchesPrice;
    });

    productList.innerHTML = '';
    if (filteredProducts.length === 0) {
        productList.innerHTML = '<p class="text-center">Nenhum produto encontrado.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card product-card h-100">
                    <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                    <div class="card-body text-center">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="price">R$${product.price}</p>
                        <p class="card-text">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

function updateFilters() {
    const eletronicosFilter = document.getElementById('filtroEletronicos').checked;
    const livrosFilter = document.getElementById('filtroLivros').checked;
    const modaFilter = document.getElementById('filtroModa').checked;

    filters.category = [];
    if (eletronicosFilter) filters.category.push('eletronicos');
    if (livrosFilter) filters.category.push('livros');
    if (modaFilter) filters.category.push('moda');

    filters.searchTerm = searchInput.value;
    filters.maxPrice = parseInt(priceRange.value);
    renderProducts();
}

searchInput.addEventListener('input', updateFilters);
document.getElementById('filtroEletronicos').addEventListener('change', updateFilters);
document.getElementById('filtroLivros').addEventListener('change', updateFilters);
document.getElementById('filtroModa').addEventListener('change', updateFilters);
priceRange.addEventListener('input', updateFilters);

renderProducts();