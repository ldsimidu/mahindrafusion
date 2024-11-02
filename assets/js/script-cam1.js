// Alternância de tema claro/escuro
document.addEventListener("DOMContentLoaded", function() {
    const themeToggleButton = document.createElement("button");
    themeToggleButton.textContent = "Toggle Theme";
    themeToggleButton.classList.add("btn", "btn-outline-light", "position-fixed", "top-0", "end-0", "m-3");
    document.body.appendChild(themeToggleButton);
  
    themeToggleButton.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
    });
  });
  
  // Adicionar uma mensagem ao chat
  function addMessage(user, message) {
    const chatMessages = document.querySelector(".chat-messages");
    const messageElement = document.createElement("div");
    messageElement.classList.add("mb-4");
  
    messageElement.innerHTML = `
      <span class="fw-bold text-primary">${user}</span>
      <span class="chat-message">: ${message}</span>
    `;
  
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Rolagem automática para a última mensagem
  }
  
  // Simulação de envio de mensagens pelo usuário
  document.addEventListener("DOMContentLoaded", () => {
    const chatInput = document.querySelector(".chat-sidebar input");
    const chatButton = document.querySelector(".chat-sidebar button");
  
    // Função para enviar a mensagem digitada
    function sendMessage() {
      const message = chatInput.value.trim();
      if (message) {
        addMessage("You", message);
        chatInput.value = "";
      }
    }
  
    chatButton.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  });

  // Adiciona mudança de style da curtida
  function curtirLive(){
    
  }
  
  // Adicionar animações aos botões ao serem clicados
  document.querySelectorAll(".btn-icon").forEach((button) => {
    button.addEventListener("mousedown", () => {
      button.classList.add("btn-clicked");
    });
  
    button.addEventListener("mouseup", () => {
      button.classList.remove("btn-clicked");
    });
  });
  