import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Row, Col, Text } from 'native-base';

export default class GenreListItem extends React.Component {
  styles = StyleSheet.create({
    listItem: {
      padding: 24,
    },
    movieTitle: {
      fontSize: 24,
    },
    imgThumbnail: {
      marginHorizontal: 10,
      height: 100,
      width: 100,
    }
  })

  async componentDidMount() {

    console.log(`\n\n\n ${this.props.movie.item.poster_path} \n\n\n`);
  }

  render() {
    const { onPress, movie } = this.props;
    return (
      <TouchableOpacity style={this.styles.listItem} onPress={ onPress }>
        <Row>
          <View >
            <Image 
              source={{uri: `https://image.tmdb.org/t/p/w500${movie.item.poster_path}`}}
              style={this.styles.imgThumbnail}
            />
          </View>
          <View >
            <Text style={this.styles.movieTitle}>{ movie.index }. { movie.item.title }</Text>
          </View>
        </Row>
      </TouchableOpacity>
    );
  }
}
