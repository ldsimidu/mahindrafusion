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

function loadImagesAndData() {
    const banner = localStorage.getItem('banner');
    const profile = localStorage.getItem('profile');
    const username = localStorage.getItem('username');
    const description = localStorage.getItem('description');

    if (banner) {
        document.getElementById('banner').style.backgroundImage = `url(${banner})`;
    }
    if (profile) {
        document.getElementById('profile').src = profile;
    }
    if (username) {
        document.getElementById('username').innerText = username;
        document.getElementById('usernameInput').value = username; 
    }
    if (description) {
        document.getElementById('descriptionInput').value = description; 
        document.getElementById('descriptionDisplay').innerText = description;
    }
}

function saveImagesAndData(bannerSrc, profileSrc, username, description) {
    localStorage.setItem('banner', bannerSrc);
    localStorage.setItem('profile', profileSrc);
    localStorage.setItem('username', username);
    localStorage.setItem('description', description);
}

document.getElementById('imageForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const bannerInput = document.getElementById('bannerInput');
    const profileInput = document.getElementById('profileInput');

    if (bannerInput.files[0]) {
        const bannerReader = new FileReader();
        bannerReader.onload = function() {
        document.getElementById('banner').style.backgroundImage = `url(${bannerReader.result})`;
        saveImagesAndData(bannerReader.result, localStorage.getItem('profile'), localStorage.getItem('username'), localStorage.getItem('description'));
    };
        bannerReader.readAsDataURL(bannerInput.files[0]);
    }

    if (profileInput.files[0]) {
        const profileReader = new FileReader();
        profileReader.onload = function() {
        document.getElementById('profile').src = profileReader.result;
        saveImagesAndData(localStorage.getItem('banner'), profileReader.result, localStorage.getItem('username'), localStorage.getItem('description'));
    };
        profileReader.readAsDataURL(profileInput.files[0]);
    }
});

document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('usernameInput').value;
    const description = document.getElementById('descriptionInput').value;

    document.getElementById('username').innerText = username;
    document.getElementById('descriptionDisplay').innerText = description;

    saveImagesAndData(localStorage.getItem('banner'), localStorage.getItem('profile'), username, description);
});

loadImagesAndData();

