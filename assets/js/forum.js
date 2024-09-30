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



document.addEventListener("DOMContentLoaded", function () {
    const upvoteButtons = document.querySelectorAll(".btn-outline-primary");
    const downvoteButtons = document.querySelectorAll(".btn-outline-danger");
  
    upvoteButtons.forEach(button => {
      button.addEventListener("click", function () {
        alert("Você deu um upvote!");
      });
    });
  
    downvoteButtons.forEach(button => {
      button.addEventListener("click", function () {
        alert("Você deu um downvote!");
      });
    });
  });

  function loadPosts() {
    const postsFeed = document.getElementById('posts-feed');
    postsFeed.innerHTML = '';

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post', 'mb-4');
        
        postElement.innerHTML = `
            <div class="d-flex justify-content-between">
                <div>
                    Na categoria <strong>generico</strong> - Postado por <a href="#">Você</a>
                </div>
                <div class="text-timer">${getTimeAgo(post.timestamp)}</div>
            </div>
            <h5 class="mt-2">${post.title}</h5>
            <p>${post.content}</p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button class="btn btn-sm btn-outline-primary">Upvote</button>
                    <button class="btn btn-sm btn-outline-danger">Downvote</button>
                </div>
                <a href="#" class="btn btn-sm btn-outline-secondary">Comentários (${post.comments})</a>
            </div>
        `;
        postsFeed.appendChild(postElement);
    });
}


function addPost(postTitle, postContent) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = {
        title: postTitle,
        content: postContent,
        timestamp: Date.now(),
        comments: 0,
    };
    posts.push(newPost);

    localStorage.setItem('posts', JSON.stringify(posts));

    loadPosts();
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

window.onload = loadPosts;