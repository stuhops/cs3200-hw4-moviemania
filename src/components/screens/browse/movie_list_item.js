import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Row, Col, Text } from 'native-base';

export default class GenreListItem extends React.Component {
  styles = StyleSheet.create({
    listItem: {
      padding: 24,
    },
    movieInfo: {
      fontSize: 16,
    },
    movieTitle: {
      fontWeight: 'bold',
    },
    imgThumbnail: {
      height: 100,
      width: 100,
    }
  })

  render() {
    const { onPress, movie } = this.props;
    return (
      <TouchableOpacity style={this.styles.listItem} onPress={ onPress }>
        <Row>
          <Col size={2}>
            <View>
              <Image 
                source={{uri: `https://image.tmdb.org/t/p/w200${movie.item.poster_path}`}}
                style={this.styles.imgThumbnail}
              />
            </View>
          </Col>
          <Col size={4}>
            <View >
              <Text style={this.styles.movieInfo} numberOfLines={5}>
                <Text style={this.styles.movieTitle}>{ movie.item.title }</Text>
                {'\n'}
                Released: { movie.item.release_date }
                {'\n'}
                Rating: { movie.item.vote_average } / 10
                {'\n'}
                { movie.item.overview }
              </Text>
            </View>
          </Col>
        </Row>
      </TouchableOpacity>
    );
  }
}
