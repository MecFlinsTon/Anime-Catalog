let animes = [];

const input = document.getElementById("searchInput");
const animeList = document.getElementById("animeList");

function renderAnimes(lista) {
  animeList.innerHTML = "";

  if (lista.length === 0) {
    animeList.innerHTML = "<p>Nenhum anime encontrado.</p>";
    return;
  }

  lista.forEach(anime => {
    animeList.innerHTML += `
      <article>
        <img src="${anime.image}" alt="Capa do anime ${anime.name}">
        <h3>${anime.name}</h3>
        <span>${anime.genre}</span>
        <p>${anime.description}</p>
        <strong>Status: ${anime.status}</strong>
      </article>
    `;
  });
}

function filterAnimes() {
  const searchText = input.value.toLowerCase().trim();

  const filteredAnimes = animes.filter(anime =>
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
