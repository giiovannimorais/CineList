import getMovies from "./themovie.js";

window.addEventListener("DOMContentLoaded", () => {
    mostrarFilmes();
});

const mostrarFilmes = async () => {
    const filmes = await getMovies();

    let boxFilmes = document.getElementById("boxFilmes");

    console.log(filmes);
    
boxFilmes.innerHTML = filmes.map(filme => `
<div class="filme"> 

    <img src="${filme.poster_path ? 
    `https://image.tmdb.org/t/p/w500${filme.poster_path}` : 
    'https://via.placeholder.com/200'}" width="200">

    <h2>${filme.title}</h2>

    <p class="genres">${filme.genres.join(", ")}</p>

    <p>⭐ ${Math.round(filme.vote_average * 10) / 10}</p>

    <div class="overlay">
        <p>${filme.overview}</p>
    </div>

</div>
`).join("");
}
