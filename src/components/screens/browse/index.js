import React from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { FlatList, View } from 'react-native';
import { Container, Text, Button } from 'native-base';
import MoviesService from '../../../services/movies.service';
import GenreListItem from './genre_list_item';

export default class Index extends React.Component {


  state = {
    currentPage: 1,
    genres: [],
    loading: true,
    allLoaded: false,
  }

  async componentDidMount() {
    try {
      const genres = await MoviesService.getAllGenres();
      this.setState({ genres, loading: false });
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
          data={this.state.genres}
          renderItem={(dataEntry) => {
            return <GenreListItem
                      genre={dataEntry}
                      onPress={() => this.props.navigation.navigate('Movies By Genre', {genre: dataEntry.item})}
                  />
          }}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(movie) => `movie_${movie.id}`}
        />
      </Container>
    );
  }
}
