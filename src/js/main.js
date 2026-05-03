const animes = [
  { name: "Naruto" },
  { name: "Dragon Ball" },
  { name: "Bleach" },
  { name: "One Piece" },
  { name: "Full metal" },
];

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
        <h3>${anime.name}</h3>
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

renderAnimes(animes);
