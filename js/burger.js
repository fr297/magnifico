(function () {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav-list");

  if (!burger || !nav) {
    console.error("Burger или nav элемент не найден. Проверь id/class в HTML.");
    return;
  }

  function toggleMenu() {
    const isOpen = nav.classList.toggle("open");
    // aria-expanded на кнопке для доступности
    burger.setAttribute("aria-expanded", String(isOpen));
  }

  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Закрыть меню при клике вне навигации
  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("open")) return;
    // если клик не внутри nav и не на кнопку
    if (!nav.contains(e.target) && e.target !== burger) {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  // Закрыть по Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      burger.focus();
    }
  });

  // Закрывать меню при клике по ссылке (часто нужно на мобильных)
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  });
})();
