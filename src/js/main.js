const animes = [
  { name: "Naruto" },
  { name: "Dragon Ball" },
  { name: "Bleach" },
  { name: "One Piece" },
  { name: "Fullmetal Alchemist" },
];

function renderAnimes(animeList, list) {
  animeList.innerHTML = "";

  if (list.length === 0) {
    animeList.innerHTML = "<p>Nenhum anime encontrado.</p>";
    return;
  }

  list.forEach((anime) => {
    animeList.innerHTML += `
      <article>
        <h3>${anime.name}</h3>
      </article>
    `;
  });
}

function initCatalog() {
  const input = document.getElementById("searchInput");
  const animeList = document.getElementById("animeList");
  const themeToggle = document.getElementById("themeToggle");

  if (!input || !animeList) {
    return;
  }

  document.body.dataset.js = "loaded";

  function updateThemeButton() {
    if (!themeToggle) {
      return;
    }

    const isDarkTheme = document.body.classList.contains("dark-theme");
    themeToggle.textContent = isDarkTheme ? "Tema claro" : "Tema escuro";
  }

  function applySavedTheme() {
    const savedTheme = localStorage.getItem("animeCatalogTheme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
    }

    updateThemeButton();
  }

  function toggleTheme() {
    const isDarkTheme = document.body.classList.toggle("dark-theme");
    localStorage.setItem("animeCatalogTheme", isDarkTheme ? "dark" : "light");
    updateThemeButton();
  }

  function filterAnimes() {
    const searchText = input.value.toLowerCase().trim();
    const filteredAnimes = animes.filter((anime) =>
      anime.name.toLowerCase().includes(searchText)
    );

    renderAnimes(animeList, filteredAnimes);
  }

  applySavedTheme();
  themeToggle?.addEventListener("click", toggleTheme);
  input.addEventListener("input", filterAnimes);
  renderAnimes(animeList, animes);
}

document.addEventListener("DOMContentLoaded", initCatalog);
