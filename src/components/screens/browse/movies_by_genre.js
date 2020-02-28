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
  
  
  async componentDidMount(){
    try {
      const movies = await MoviesService.getMoviesByGenre(this.props.route.params.genre.id);
      this.setState({movies, loading: false});
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


  loadMoreMovies = () => {
    if (this.state.loading) return;
    if (this.state.allLoaded) return;

    this.setState(
      { loading: true },
      async () => {
        try {
          const newMovies = await MoviesService.getMoviesByGenre(this.props.route.params.genre.id, this.state.currentPage + 1);
          this.setState((state) => {
            const newState = {...state};
            newState.movies = [...state.movies, ...newMovies];
            newState.currentPage = state.currentPage + 1;
            newState.loading = false;
            if (newMovies.length === 0) {
              newState.allLoaded = true;
            }
            return newState;
          });
        } catch(e) {
          console.log(e);
        }
      }
    )
  }


  render() {
    return (
      <Container>
        <FlatList
          data={this.state.movies}
          renderItem={(dataEntry) => {
            return <MovieListItem
                      movie={dataEntry}
                      onPress={() => this.props.navigation.push('Movie Info', {movie: dataEntry.item})}
                  />
          }}
          onEndReached={this.loadMoreMovies}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(movie) => `movie_${movie.id}`}
        />
      </Container>
    );
  }
}
