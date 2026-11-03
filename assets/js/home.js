(() => {
  const filters = document.querySelector(".field-filters");
  if (!filters) return;

  const buttons = [...filters.querySelectorAll("[data-filter]")];
  const cards = [...document.querySelectorAll("#selected-work [data-topics]")];
  const status = document.getElementById("filter-status");
  filters.hidden = false;

  for (const button of buttons) {
    const topic = button.dataset.filter;
    if (topic !== "all" && !cards.some((card) => card.dataset.topics.split(" ").includes(topic))) {
      button.hidden = true;
    }

    button.addEventListener("click", () => {
      let shown = 0;
      for (const card of cards) {
        card.hidden = topic !== "all" && !card.dataset.topics.split(" ").includes(topic);
        if (!card.hidden) shown++;
      }
      for (const other of buttons) {
        other.setAttribute("aria-pressed", String(other === button));
      }
      status.textContent = `Showing ${shown} ${shown === 1 ? "selection" : "selections"}: ${button.textContent}.`;
    });
  }
})();
