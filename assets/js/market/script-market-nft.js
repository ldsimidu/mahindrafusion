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
    { name: 'Audi e-tron FE06', category: 'NFT', price: 1200, image: '../../images/product/nft/car1.jpg' },
    { name: 'DS E-TENSE FE21', category: 'NFT', price: 3500, image: '../../images/product/nft/car2.jpg' },
    { name: 'Nissan IM02', category: 'NFT', price: 50, image: '../../images/product/nft/car3.jpg' },
    { name: 'Jaguar I-TYPE 5', category: 'NFT', price: 100, image: '../../images/product/nft/car4.jpg' },
    { name: 'Mercedes-Benz EQ Silver Arrow 02', category: 'NFT', price: 200, image: '../../images/product/nft/car5.jpg' },
    { name: 'Porsche 99X Electric', category: 'NFT', price: 40, image: '../../images/product/nft/car6.jpg' },
    { name: 'Mahindra M7 Electro', category: 'NFT', price: 300, image: '../../images/product/nft/car7.jpg' }
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
    if (eletronicosFilter) filters.category.push('NFT');
    if (livrosFilter) filters.category.push('livros');
    if (modaFilter) filters.category.push('merch');

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