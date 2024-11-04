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
    { name: 'Gradient Formula E Cap', category: 'merch', team: '', price: 85, image: '../../images/product/merch/bone-e.png'},
    { name: 'New Era Repreve 9FIFTY Cap - Black Edition', category: 'merch', team: '', price: 90, image: '../../images/product/merch/bone-e2.png'},
    { name: 'Formula E Eco Bag', category: 'merch', team: '', price: 30, image: '../../images/product/merch/bag1.jpg'},
    { name: 'Formula E Hoodie - Blue Speed', category: 'merch', team: '', price: 120, image: '../../images/product/merch/blusa1.jpg'},
    { name: 'Formula E Zip Hoodie - Grey', category: 'merch', team: '', price: 125, image: '../../images/product/merch/blusa2.jpg'},
    { name: 'Formula E Windbreaker - Black Edition', category: 'merch', team: '', price: 150, image: '../../images/product/merch/blusa3.jpg'},
    { name: 'Formula E Team Jersey', category: 'merch', team: '', price: 65, image: '../../images/product/merch/camisa1.jpg'},
    { name: 'Formula E Sun Hat', category: 'merch', team: '', price: 45, image: '../../images/product/merch/chapeu1.jpg'},
    { name: 'Formula E Water Bottle', category: 'merch', team: '', price: 25, image: '../../images/product/merch/garrafa1.jpg'},
    { name: 'ABT Sportsline Backpack', category: 'merch', team: 'ABT Sportsline', price: 100, image: '../../images/product/merch/teams-merch/abt/abt1.jpg'},
    { name: 'ABT Sportsline Cap', category: 'merch', team: 'ABT Sportsline', price: 90, image: '../../images/product/merch/teams-merch/abt/abt-bone1.jpg'},
    { name: 'Andretti United Backpack', category: 'merch', team: 'Andretti United', price: 100, image: '../../images/product/merch/teams-merch/andretti/andretti.jpg'},
    { name: 'Andretti United Team Jacket', category: 'merch', team: 'Andretti United', price: 150, image: '../../images/product/merch/teams-merch/andretti/andretti2.jpg'},
    { name: 'Mahindra Racing Hoodie', category: 'merch', team: 'Mahindra Racing', price: 120, image: '../../images/product/merch/teams-merch/mahindra/mahindra-blusa1.jpg'},
    { name: 'Mahindra Racing Cap', category: 'merch', team: 'Mahindra Racing', price: 90, image: '../../images/product/merch/teams-merch/mahindra/mahindra-bone1.jpg'},
    { name: 'Mahindra Racing Team Backpack', category: 'merch', team: 'Mahindra Racing', price: 100, image: '../../images/product/merch/teams-merch/mahindra/mahindra1.jpg'}
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
        const matchesCategory = filters.category.length === 0 || filters.category.includes(product.category) || (filters.category.includes('merch') && product.category === 'merch');
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
                        <p class="card-text">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}${product.team ? ' - ' + product.team : ''}</p>
                        <button class="btn btn-primary add-to-cart-btn" onclick="addToCart('${product.name}', ${product.price})">Adicionar ao Carrinho</button>
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

function addToCart(productName, productPrice) {
    // Lógica para adicionar o produto ao carrinho
    console.log(`Produto adicionado: ${productName}, Preço: R$${productPrice}`);
    alert(`Produto "${productName}" adicionado ao carrinho!`);
}


searchInput.addEventListener('input', updateFilters);
document.getElementById('filtroEletronicos').addEventListener('change', updateFilters);
document.getElementById('filtroLivros').addEventListener('change', updateFilters);
document.getElementById('filtroModa').addEventListener('change', updateFilters);
priceRange.addEventListener('input', updateFilters);

renderProducts();
