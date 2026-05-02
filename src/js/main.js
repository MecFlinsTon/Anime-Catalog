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

  lista.forEach(anime => {
    animeList.innerHTML += `<p>${anime.name}</p>`;
  });
}

renderAnimes(animes);