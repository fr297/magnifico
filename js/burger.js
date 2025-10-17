const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-list");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
