(function () {
  const tabsContainer = document.getElementById("tabs");
  const contentEl = document.getElementById("tab-content");

  // Тексты для каждого таба
  const tabTexts = {
    research:
      "Explore the market, collect ideas, and analyze data together with your team. All notes, links, and discussions are stored in one shared workspace, accessible to everyone.",
    plan: "Plan projects, assign tasks, and track progress in real time. The whole team can see priorities and deadlines, keeping work transparent and organized. You’ll always know who’s responsible for what and how the project is moving forward.",
    design:
      "Create prototypes and visual concepts together with your team in one place. Share mockups, leave comments, and make edits without losing context. Collaborative design has never been easier, faster, or more efficient.",
  };

  // Вспомогательная: вернёт текущую активную вкладку (если есть)
  function getActiveTab() {
    return tabsContainer.querySelector(".tab.active");
  }

  // Смена текста с анимацией: direction = 'left' | 'right' (для направления анимации)
  function changeContent(newText, direction = "left") {
    if (!contentEl) return;
    // Добавим класс, который уводит старый контент в сторону и скрывает
    contentEl.classList.remove("hide-left", "hide-right");
    contentEl.classList.add(direction === "left" ? "hide-left" : "hide-right");

    // После окончания transition, заменяем текст и возвращаем видимость
    // Используем один обработчик, который удалится сам
    const onTransitionEnd = (e) => {
      // убедимся, что слушаем свой элемент
      if (e.target !== contentEl) return;
      contentEl.removeEventListener("transitionend", onTransitionEnd);

      // поставить новый текст и плавно вернуть
      contentEl.textContent = newText;
      // небольшая пауза перед снятием класса — чтобы browser зарегистрировал изменение
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          contentEl.classList.remove("hide-left", "hide-right");
        });
      });
    };

    contentEl.addEventListener("transitionend", onTransitionEnd);
  }

  // Обработчик клика (делегирование)
  tabsContainer.addEventListener("click", (ev) => {
    const tab = ev.target.closest(".tab");
    if (!tab || !tabsContainer.contains(tab)) return;

    const selected = tab.dataset.tab;
    if (!selected) {
      console.warn("Tab without data-tab clicked");
      return;
    }

    // если уже активная — ничего не делаем
    const active = getActiveTab();
    if (active === tab) return;

    // переключение класса active
    if (active) active.classList.remove("active");
    tab.classList.add("active");

    // выберем направление анимации по положению вкладок (опционально)
    let direction = "left";
    if (active) {
      const tabs = Array.from(tabsContainer.querySelectorAll(".tab"));
      const oldIndex = tabs.indexOf(active);
      const newIndex = tabs.indexOf(tab);
      direction = newIndex > oldIndex ? "left" : "right";
    }

    // получаем текст и меняем
    const text = tabTexts[selected] || "Описание отсутствует.";
    changeContent(text, direction);

    // для отладки:
    console.log("Switched to tab:", selected);
  });

  // дополнительная защита: если active нет — выставим первый
  if (!getActiveTab()) {
    const first = tabsContainer.querySelector(".tab");
    if (first) first.classList.add("active");
  }
})();
