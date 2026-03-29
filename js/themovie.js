const API_KEY = "19cec70bd1496d809e61ae51044757a1";

const getGenres = async () => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pt-BR`;

    const resposta = await fetch(url);
    const data = await resposta.json();

    const generoMap = {};
    data.genres.forEach(gen => {
        generoMap[gen.id] = gen.name;
    });

    return generoMap;
};

const getMovies = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=pt-BR`;

    try {
        const generoMap = await getGenres();

        const resposta = await fetch(url);
        const data = await resposta.json();

        const filmes = data.results.slice(0, 10);

        const filmesComGenero = filmes.map(filme => ({
            ...filme,
            genres: filme.genre_ids.map(id => generoMap[id])
        }));

        return filmesComGenero;

    } catch (error) {
        console.log(error.message);
        return [];
    }
};

export default getMovies;