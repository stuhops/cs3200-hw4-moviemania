
const API_KEY = '69ac23141ff6947867a4ce83f3fe8432';
const ROOT_URL = 'https://api.themoviedb.org/3';

export default class MoviesService {

  static async search(searchTerm, pageNumber = 1) {
    fetch(`${ROOT_URL}/search/movie?query=${searchTerm}&page=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json;charset=utf-8',
        }
      }
    )

      .then(result => result.json())
      .then(result => {
        if (result.success == false) throw new Error(result.status_message);
        return result;
      });

  }

}
