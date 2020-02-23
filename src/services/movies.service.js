
const API_KEY = 'api_key=69ac23141ff6947867a4ce83f3fe8432';
const ROOT_URL = 'https://api.themoviedb.org/3';

export default class MoviesService {

  static async search(searchTerm, pageNumber = 1) {
    fetch(`${ROOT_URL}/search/movie?query=${searchTerm}&page=${pageNumber}`)
      .then(result => result.json())
      .then(result => {
        if (result.success == false) throw new Error(result.status_message);
        return result;
      });
  }


  static async getAllGenres() {
    fetch(`${ROOT_URL}/genre/movie/list?${API_KEY}&language=en-US`)
      .then(result => result.json())
      .then(result => {
        if (result.success == false) throw new Error(result.status_message);
        return result;
      });
  }


  static async getMoviesByGenre(genreIds, pageNumber=1) {
    fetch(`${ROOT_URL}/discover/movie?with_genres=${genreIds}&page=${pageNumber}&${API_KEY}&language=en-US`)
      .then(result => result.json())
      .then(result => {
        // console.log(result.results[0].title);

        if (result.success == false) throw new Error(result.status_message);
        return result;
      });
  }
}
