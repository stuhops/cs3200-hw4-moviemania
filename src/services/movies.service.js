
const API_KEY = 'api_key=69ac23141ff6947867a4ce83f3fe8432';
const ROOT_URL = 'https://api.themoviedb.org/3';

export default class MoviesService {

  static async search(searchTerm, pageNumber = 1) {
    const result = await fetch(`${ROOT_URL}/search/movie?query=${searchTerm}&page=${pageNumber}&${API_KEY}`);
    const resJson = await result.json();
    return resJson.results;
  }


  static async getAllGenres() {
    const result = await fetch(`${ROOT_URL}/genre/movie/list?${API_KEY}&language=en-US`);
    const resJson = await result.json();
    return resJson.genres;
  }


  static async getMoviesByGenre(genreIds, pageNumber=1) {
    const result = await fetch(`${ROOT_URL}/discover/movie?with_genres=${genreIds}&page=${pageNumber}&${API_KEY}&language=en-US`);
    const resJson = await result.json();
    return resJson.results; 
  }


  static async getMovieInfo(movieId) {
    const result = await fetch(`${ROOT_URL}/movie/${movieId}?${API_KEY}&language=en-US`);
    const resJson = await result.json();

    const creditResult = await fetch(`${ROOT_URL}/movie/${movieId}/credits?${API_KEY}&language=en-US`);
    const creditResJson = await creditResult.json();

    resJson.cast = creditResJson;

    return resJson; 
  }


  static async getPersonalInfo(personalId) {
    const result = await fetch(`${ROOT_URL}/person/${personalId}?${API_KEY}&language=en-US`);
    const resJson = await result.json();
    return resJson; 
  }

}
