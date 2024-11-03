fetch('../components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('nav').innerHTML = data;
    })
    .catch(error => {
        console.error('Erro ao carregar o header:', error);
    });

fetch('../components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
    })
    .catch(error => {
        console.error('Erro ao carregar o footer:', error);
    });

document.addEventListener("DOMContentLoaded", function () {
    const followButtons = document.querySelectorAll(".follow-button");

    followButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (button.innerText === "Seguir") {
                button.innerText = "Seguindo";
                button.classList.remove("btn-primary");
                button.classList.add("btn-success");
            } else {
                button.innerText = "Seguir";
                button.classList.remove("btn-success");
                button.classList.add("btn-primary");
            }
        });
    });

    loadPosts();
});

function loadPosts() {
    const postsFeed = document.getElementById('posts-feed');
    postsFeed.innerHTML = '';

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.sort((a, b) => b.votes - a.votes);

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post', 'mb-4');
        
        postElement.innerHTML = `
            <div class="d-flex justify-content-between">
                <div>
                    Na categoria <strong>genérico</strong> - Postado por <a href="#">Você</a>
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

        postsFeed.appendChild(postElement);
    });
}

function addPost(postTitle, postContent) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = {
        title: postTitle,
        content: postContent,
        timestamp: Date.now(),
        comments: Math.floor(Math.random() * 20),
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