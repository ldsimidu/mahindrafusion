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
  