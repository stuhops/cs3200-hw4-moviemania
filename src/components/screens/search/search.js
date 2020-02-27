import React from 'react';
import { FlatList, View } from 'react-native';
import { Container, Item, Input, } from 'native-base';
import MoviesService from '../../../services/movies.service';
import MovieListItem from '../browse/movie_list_item';

export default class Index extends React.Component {
  state = {
    currentPage: 1,
    movies: [],
    searchTerm: 'Star Wars',
    loading: true,
    allLoaded: false,
  }
  
  
  async componentDidMount(){
    this.search(this.state.searchTerm, this.state.currentPage);
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


  async search(searchTerm, pageNumber=1) {
    try {
      if(searchTerm === '') return;

      const movies = await MoviesService.search(searchTerm, pageNumber);
      console.log(movies);
      this.setState({movies, searchTerm, loading: false});
    } catch (e) {
      console.log(e);
    }
  }


  loadMoreMovies = () => {
    if (this.state.loading) return;
    if (this.state.allLoaded) return;

    this.setState(
      { loading: true },
      async () => {
        try {
          const newMovies = await MoviesService.search(this.state.searchTerm, this.state.currentPage + 1);
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
        <Item rounded>
          <Input
            placeholder='Search: "Star Wars"'
            onChangeText={text => this.search(text)}
         />
        </Item>
        <FlatList
          data={this.state.movies}
          renderItem={(dataEntry) => {
            return <MovieListItem
                      movie={dataEntry}
                      onPress={() => this.props.navigation.navigate('Movie Info', {movie: dataEntry.item})}
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
