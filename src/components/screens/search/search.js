import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Container, Input, Item, Row, Text, } from 'native-base';
import MoviesService from '../../../services/movies.service';
import MovieListItem from '../browse/movie_list_item';
import CastListItem from '../info/cast_list_item';

export default class Index extends React.Component {
  state = {
    currentPage: 1,
    movies: [],
    people: [],
    searchCategory: 'movies',
    searchTerm: 'Star Wars',
    loading: true,
    allLoaded: false,
  }
  
  
  async componentDidMount(){
    this.search(this.state.searchTerm, this.state.searchCategory, this.state.currentPage);
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


  async search(searchTerm, searchCategory, pageNumber=1) {
    try {
      if(searchTerm === '') return;

      let movies = [];
      let people = []; 

      if(searchCategory === 'movies') {
        movies = await MoviesService.searchMovies(searchTerm, pageNumber);
      }
      else if(searchCategory === 'people') {
        people = await MoviesService.searchPeople(searchTerm, pageNumber);
      }


      this.setState({people, movies, searchCategory, searchTerm, currentPage: pageNumber, loading: false});
    } catch (e) {
      console.log(e);
    }
  }


  loadMoreMovies = () => {
    if (   this.state.loading
        || this.state.allLoaded
        || this.state.searchCategory != 'movies'
        ) return;

    this.setState(
      { loading: true },
      async () => {
        try {
          const newMovies = await MoviesService.searchMovies(this.state.searchTerm, this.state.currentPage + 1);
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


  loadMorePeople = () => {
    if (   this.state.loading
        || this.state.allLoaded
        || this.state.searchCategory != 'people'
        ) return;

    this.setState(
      { loading: true },
      async () => {
        try {
          const newPeople = await MoviesService.searchPeople(this.state.searchTerm, this.state.currentPage + 1);
          this.setState((state) => {
            const newState = {...state};
            newState.people = [...state.people, ...newPeople];
            newState.currentPage = state.currentPage + 1;
            newState.loading = false;
            if (newPeople.length === 0) {
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
    console.log(this.state.searchCategory)
    return (
      <Container>
        <Item rounded style={this.styles.searchBar}>
          <Input
            placeholder='Search: "Star Wars"'
            onChangeText={text => this.search(text, this.state.searchCategory)}
         />
        </Item>
        <Row style={this.styles.btnRow}>
          <Button bordered={() => {this.state.searchCategory === 'movies'}} small onPress={() => this.search(this.state.searchTerm, 'movies')}>
            <Text>Movies</Text>
          </Button>
          <Button bordered={() => this.state.searchCategory === 'people'} small onPress={() => this.search(this.state.searchTerm, 'people')}>
            <Text>People</Text>
          </Button>
        </Row>
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
        <FlatList
          data={this.state.people}
          renderItem={(dataEntry) => {
            return <CastListItem
                      person={dataEntry.item}
                      onPress={() => this.props.navigation.push('Profile', {person: dataEntry.item})}
                  />
          }}
          onEndReached={this.loadMorePeople}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(person) => `person_${person.id}`}
        />
      </Container>
    );
  }


  styles = StyleSheet.create({
    searchBar: {
      margin: 8,
    },
    btnRow: {
      height: 24,
      margin: 8,
      justifyContent: 'center',
    }
  });
}
