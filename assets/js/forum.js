fetch('/mahindrafusion/assets/components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav').innerHTML = data;
    })
    .catch(error => {
        console.error('Erro ao carregar o header:', error);
    });

fetch('/mahindrafusion/assets/components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    })
    .catch(error => {
        console.error('Erro ao carregar o footer:', error);
    });

document.addEventListener("DOMContentLoaded", function () {
    loadPosts();
    loadSuggestedUsers();
});

function loadSuggestedUsers() {
    const users = [
        "@RobsonCaminhões", "@EuAmoFE", "@Borabilson", "@AmoCarros", "@MarcosCosta",
        "@GabrielLilla", "@LucasSimidu", "@CaioFelipe", "@RicardoCerazi", "@CarlosEduardo",
        "@usuário981637", "@Senninha"
    ];

    const shuffledUsers = users.sort(() => 0.5 - Math.random());
    const selectedUsers = shuffledUsers.slice(0, 3);
    const followedUsers = JSON.parse(localStorage.getItem('followedUsers')) || [];

    const suggestedUsersList = document.getElementById('suggested-users');
    suggestedUsersList.innerHTML = '';

    selectedUsers.forEach(user => {
        const isFollowing = followedUsers.includes(user);
        const userItem = document.createElement('li');
        userItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        userItem.innerHTML = `
            <div>${user}</div>
            <button class="btn btn-sm ${isFollowing ? 'btn-success' : 'btn-primary'} follow-button">${isFollowing ? 'Seguindo' : 'Seguir'}</button>
        `;
        suggestedUsersList.appendChild(userItem);
    });

    document.querySelectorAll(".follow-button").forEach(button => {
        button.addEventListener("click", function () {
            const user = this.parentElement.firstChild.textContent;
            let followedUsers = JSON.parse(localStorage.getItem('followedUsers')) || [];
            
            if (this.innerText === "Seguir") {
                this.innerText = "Seguindo";
                this.classList.remove("btn-primary");
                this.classList.add("btn-success");
                followedUsers.push(user);
            } else {
                this.innerText = "Seguir";
                this.classList.remove("btn-success");
                this.classList.add("btn-primary");
                followedUsers = followedUsers.filter(f => f !== user);
            }

            localStorage.setItem('followedUsers', JSON.stringify(followedUsers));
        });
    });
}

function loadPosts() {
    const postsFeed = document.getElementById('posts-feed');
    postsFeed.innerHTML = '';

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.sort((a, b) => b.votes - a.votes);

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post', 'mb-4');
        
        postElement.innerHTML = `
            <div class="d-flex justify-content-between">
                <div>
                    Na categoria <strong>${post.category || 'Genérico'}</strong> - Postado por <a href="#">Você</a>
                </div>
                <div class="text-timer">${getTimeAgo(post.timestamp)}</div>
            </div>
            <h5 class="mt-2">${post.title}</h5>
            <p>${post.content}</p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary upvote-btn">Upvote</button>
                    <button class="btn btn-sm btn-outline-danger downvote-btn">Downvote</button>
                </div>
                <a href="#" class="btn btn-sm btn-outline-secondary">Comentários (${post.comments})</a>
                <button class="btn btn-sm btn-outline-danger delete-btn">Excluir</button>
                <div class="votes">Votos: ${post.votes}</div>
            </div>
        `;

        postElement.querySelector('.upvote-btn').addEventListener('click', function () {
            post.votes += 1;
            savePosts(posts);
            loadPosts();
        });

        postElement.querySelector('.downvote-btn').addEventListener('click', function () {
            if (post.votes > 0) {
                post.votes -= 1;
                savePosts(posts);
                loadPosts();
            }
        });

        postElement.querySelector('.delete-btn').addEventListener('click', function () {
            if (confirm('Você tem certeza que deseja excluir esta publicação?')) {
                posts.splice(index, 1); 
                savePosts(posts);
                loadPosts();
            }
        });

        postsFeed.appendChild(postElement);
    });
}

function addPost(postTitle, postContent) {
    const category = document.getElementById('post-category').value;
    
    if (!category) {
        alert('Por favor, selecione uma categoria.');
        return;
    }

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = {
        title: postTitle,
        content: postContent,
        timestamp: Date.now(),
        category: category,
        comments: 0,
        votes: 0
    };
    posts.push(newPost);

    savePosts(posts);
    loadPosts();
}

function savePosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

function getTimeAgo(timestamp) {
    const secondsAgo = Math.floor((Date.now() - timestamp) / 1000);
    const hours = Math.floor(secondsAgo / 3600);
    if (hours < 1) return `${Math.floor(secondsAgo / 60)} minutos atrás`;
    return `${hours} horas atrás`;
}

document.getElementById('post-btn').addEventListener('click', function () {
    const postTitle = document.getElementById('post-title').value.trim();
    const postContent = document.getElementById('post-content').value.trim();

    if (postTitle !== '' && postContent !== '') {
        addPost(postTitle, postContent);
        document.getElementById('post-title').value = ''; 
        document.getElementById('post-content').value = ''; 
    }
});