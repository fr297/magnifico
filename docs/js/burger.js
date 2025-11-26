document.querySelectorAll(".burger-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".burger-wrapp");
    card.classList.toggle("open");
  });
});
