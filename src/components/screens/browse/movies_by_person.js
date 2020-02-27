import React from 'react';
import { FlatList, View } from 'react-native';
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
      console.log('here');
      const movies = await MoviesService.getMoviesByPerson(this.props.route.params.id);
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


  render() {
    return (
      <Container>
        <FlatList
          data={this.state.movies}
          renderItem={(dataEntry) => {
            return <MovieListItem
                      movie={dataEntry}
                      onPress={() => this.props.navigation.navigate('Movie Info', {movie: dataEntry.item})}
                  />
          }}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(movie) => `movie_${movie.id}`}
        />
      </Container>
    );
  }
}
