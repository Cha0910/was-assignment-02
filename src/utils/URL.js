const baseUrl = 'https://api.themoviedb.org/3';

/**
 * Fetches the featured movie (first movie from the popular movies list).
 * @param {string} apiKey - The API key for TMDB.
 * @returns {Promise<Object>} - A promise that resolves to the featured movie object.
 */
async function fetchFeaturedMovie(apiKey) {
    const url = `${baseUrl}/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results[0];
    } catch (error) {
        console.error('Error fetching featured movie:', error);
    }
}

/**
 * Generates the URL for fetching popular movies.
 * @param {string} apiKey - The API key for TMDB.
 * @returns {string} - The URL for fetching popular movies.
 */
function getURL4PopularMovies(apiKey) {
    return `${baseUrl}/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`;
}

/**
 * Generates the URL for fetching currently released movies.
 * @param {string} apiKey - The API key for TMDB.
 * @returns {string} - The URL for fetching released movies.
 */
function getURL4ReleaseMovies(apiKey) {
    return `${baseUrl}/movie/now_playing?api_key=${apiKey}&language=ko-KR&page=1`;
}

/**
 * Generates the URL for fetching movies by a specific genre.
 * @param {string} apiKey - The API key for TMDB.
 * @param {string} genreId - The genre ID for the movies.
 * @returns {string} - The URL for fetching movies by genre.
 */
function getURL4GenreMovies(apiKey, genreId) {
    return `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=ko-KR&page=1`;
}

/**
 * Fetches movies from the given URL.
 * @param {string} url - The URL for fetching movies.
 * @returns {Promise<Object>} - A promise that resolves to the movie data.
 */
async function fetchMovies(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

export {
    fetchFeaturedMovie,
    getURL4PopularMovies,
    getURL4ReleaseMovies,
    getURL4GenreMovies,
    fetchMovies
};
