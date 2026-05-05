let animes = [];

const input = document.getElementById("searchInput");
const animeList = document.getElementById("animeList");
const favoritosSalvos = localStorage.getItem("Favoritos");
let favoritos = [];

try {
  favoritos = favoritosSalvos ? JSON.parse(favoritosSalvos) : [];
} catch (error) {
  favoritos = [];
}

function renderAnimes(lista) {
  animeList.innerHTML = "";

  if (lista.length === 0) {
    animeList.innerHTML = "<p>Nenhum anime encontrado.</p>";
    return;
  }

  lista.forEach((anime) => {
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

function filterAnimes() {
  const searchText = input.value.toLowerCase().trim();

  const filteredAnimes = animes.filter((anime) =>
    anime.name.toLowerCase().includes(searchText)
  );

  renderAnimes(filteredAnimes);
}

input.addEventListener("input", filterAnimes);

async function loadAnimes() {
  try {
    const response = await fetch("./src/data/animes.json");
    animes = await response.json();
    renderAnimes(animes);
  } catch (error) {
    animeList.innerHTML = "<p>Não foi possível carregar os animes.</p>";
  }
}

loadAnimes();

function toggleFavorito(nomeAnime) {
  const jaFavoritado = favoritos.includes(nomeAnime);

  if (jaFavoritado) {
    favoritos = favoritos.filter((nome) => nome !== nomeAnime);
  } else {
    favoritos.push(nomeAnime);
  }

  localStorage.setItem("Favoritos", JSON.stringify(favoritos));
  filterAnimes();
}
