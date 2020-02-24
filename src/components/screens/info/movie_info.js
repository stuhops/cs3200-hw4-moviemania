import React from 'react';
import { Col, Row} from 'react-native-easy-grid';
import { Container, Text, Button } from 'native-base';
import { Image, StyleSheet, } from 'react-native';

export default class HomePage1 extends React.Component {

  styles = StyleSheet.create({
    imgThumbnail: {
      width: 150,
      height: 250,
    },
    movieTitle: {
      fontWeight: 'bold',
      fontSize: 36,
      textAlign: 'center',
      padding: 8,
      marginBottom: 24,

    },
    movieInfo: {
      fontSize: 16,
    },
    container: {
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 24,
    },
  })


  render() {
    const { navigation, movie } = this.props.route.params;
    console.log(movie);
    return (
      <Container>
        <Text style={this.styles.movieTitle}>{ movie.title }</Text>
        <Row style={this.styles.container}>
          <Col>
            <Image 
              source={{uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`}}
              style={this.styles.imgThumbnail}
            />
          </Col>
          <Col>
            <Text style={this.styles.movieInfo}>
              { movie.overview }
            </Text>
          </Col>
        </Row>
      </Container>
    );
  }
}
