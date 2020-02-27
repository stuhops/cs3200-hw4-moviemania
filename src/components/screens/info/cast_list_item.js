import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Row, Col, Text } from 'native-base';

import MoviesService from '../../../services/movies.service';

export default class GenreListItem extends React.Component {
  state = {
    person: {},
  }


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
  });


  async componentDidMount() {
    try {
      const person = await MoviesService.getPersonalInfo(this.props.person.id);
      this.setState({ person, loading: false });
    } catch (e) {
      console.log(e);
    }
  }


  render() {
    const { onPress } = this.props;
    return (
      <TouchableOpacity style={this.styles.listItem} onPress={ onPress }>
        <Row>
          <Col size={2}>
            <View>
              <Image 
                source={{uri: `https://image.tmdb.org/t/p/w200${this.state.person.profile_path}`}}
                style={this.styles.imgThumbnail}
              />
            </View>
          </Col>
          <Col size={4}>
            <View >
              <Text style={this.styles.movieInfo} numberOfLines={5}>
                <Text style={this.styles.movieTitle}>{ this.state.person.name }</Text>
                {'\n'}
                Popularity: { this.state.person.popularity } / 10
              </Text>
            </View>
          </Col>
        </Row>
      </TouchableOpacity>
    );
  }
}

