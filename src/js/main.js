const animes = [
  { name: "Naruto" },
  { name: "Dragon Ball" },
  { name: "Bleach" },
  { name: "One Piece" },
  { name: "Full metal" },
];

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

  lista.forEach(anime => {
    const jaFavoritado = favoritos.includes(anime.name);
    animeList.innerHTML += `
      <article>
        <h3>${anime.name}</h3>
        <button onclick="toggleFavorito('${anime.name}')">
        ${jaFavoritado ? "Remover favorito" : "Favoritar"}
        </button>
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


function toggleFavorito(nomeAnime) {
  const jaFavoritado = favoritos.includes(nomeAnime);


  if (jaFavoritado) {
    favoritos = favoritos.filter(nome => nome !== nomeAnime);
  } else  {
    favoritos.push(nomeAnime);

   
  }
   localStorage.setItem("Favoritos", JSON.stringify(favoritos));
    filterAnimes();

  }

