let animes = [];
let favoritos = [];

function carregarFavoritos() {
  const favoritosSalvos = localStorage.getItem("Favoritos");

  try {
    favoritos = favoritosSalvos ? JSON.parse(favoritosSalvos) : [];
  } catch (error) {
    favoritos = [];
  }
}

function salvarFavoritos() {
  localStorage.setItem("Favoritos", JSON.stringify(favoritos));
}

function renderAnimes(animeList, list) {
  animeList.innerHTML = "";

  if (list.length === 0) {
    animeList.innerHTML = "<p>Nenhum anime encontrado.</p>";
    return;
  }

  list.forEach((anime) => {
    const jaFavoritado = favoritos.includes(anime.name);

    animeList.innerHTML += `
      <article>
        <img src="${anime.image}" alt="Capa do anime ${anime.name}">
        <h3>${anime.name}</h3>
        <span>${anime.genre}</span>
        <p>${anime.description}</p>
        <strong>Status: ${anime.status}</strong>
        <button type="button" onclick="toggleFavorito('${anime.name}')">
          ${jaFavoritado ? "Remover favorito" : "Favoritar"}
        </button>
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
  carregarFavoritos();

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

  async function loadAnimes() {
    try {
      const response = await fetch("./src/data/animes.json");
      animes = await response.json();
      renderAnimes(animeList, animes);
    } catch (error) {
      animeList.innerHTML = "<p>Não foi possível carregar os animes.</p>";
    }
  }

  window.toggleFavorito = function toggleFavorito(nomeAnime) {
    const jaFavoritado = favoritos.includes(nomeAnime);

    if (jaFavoritado) {
      favoritos = favoritos.filter((nome) => nome !== nomeAnime);
    } else {
      favoritos.push(nomeAnime);
    }

    salvarFavoritos();
    filterAnimes();
  };

  applySavedTheme();
  themeToggle?.addEventListener("click", toggleTheme);
  input.addEventListener("input", filterAnimes);
  loadAnimes();
}

document.addEventListener("DOMContentLoaded", initCatalog);
