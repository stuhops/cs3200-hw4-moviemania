import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Container } from 'native-base';
import MoviesService from '../../../services/movies.service';
import MovieListItem from './movie_list_item';

export default class Index extends React.Component {
  state = {
    currentPage: 1,
    movies: [],
    loading: true,
    allLoaded: false,
  }

  async componentDidMount() {
    const TEMPORARY = [
                       {"adult": false, "backdrop_path": "/qonBhlm0UjuKX2sH7e73pnG0454.jpg", "genre_ids": [28, 35, 878, 10751], "id": 454626, "original_language": "en", "original_title": "Sonic the Hedgehog", "overview": "Based on the global blockbuster videogame franchise from Sega, Sonic the Hedgehog tells the story of the world’s speediest hedgehog as he embraces his new home on Earth. In this live-action adventure comedy, Sonic and his new best friend team up to defend the planet from the evil genius Dr. Robotnik and his plans for world domination.", "popularity": 243.267, "poster_path": "/aQvJ5WPzZgYVDrxLX4R6cLJCEaQ.jpg", "release_date": "2020-02-12", "title": "Sonic the Hedgehog", "video": false, "vote_average": 7.1, "vote_count": 330},
                       {"adult": false, "backdrop_path": "/ekP6EVxL81lZ4ivcqPsoZ72rY0h.jpg", "genre_ids": [28, 18, 36], "id": 449924, "original_language": "cn", "original_title": "葉問4", "overview": "Following the death of his wife, Ip Man travels to San Francisco to ease tensions between the local kung fu masters and his star student, Bruce Lee, while searching for a better future for his son.", "popularity": 162.83, "poster_path": "/yJdeWaVXa2se9agI6B4mQunVYkB.jpg", "release_date": "2019-12-20", "title": "Ip Man 4: The Finale", "video": false, "vote_average": 6, "vote_count": 301}
                      ]

    // const { genreIds } = this.props;
    const genreIds = 28;
    try {
      const movies = await MoviesService.getMoviesByGenre(genreIds);
      this.setState({ movies: TEMPORARY, loading: false })
    } catch (e) {
      console.log(e);
    }
  }

   renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'lightgray',
        height: 1,
        opacity: 50,
      }}
    />
  );

  render() {
    return (
      <Container>
        <FlatList
          data={this.state.movies}
          renderItem={(dataEntry) => {
            return <MovieListItem
                      movie={dataEntry}
                      onPress={() => this.props.navigation.navigate('Movie Info')}
                  />
          }}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(movie) => `movie_${movie.id}`}
        />
      </Container>
    );
  }
}
