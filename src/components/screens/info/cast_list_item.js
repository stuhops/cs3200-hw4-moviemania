import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Row, Col, Text } from 'native-base';

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
    const { onPress, person } = this.props;
    console.log(this.props);
    return (
      <TouchableOpacity style={this.styles.listItem} onPress={ onPress }>
        <Row>
          <Col size={2}>
            <View>
              <Image 
                source={{uri: `https://image.tmdb.org/t/p/w200${person.profile_path}`}}
                style={this.styles.imgThumbnail}
              />
            </View>
          </Col>
          <Col size={4}>
            <View >
              <Text style={this.styles.movieInfo} numberOfLines={5}>
                <Text style={this.styles.movieTitle}>{ person.name }</Text>
                {'\n'}
                Character: { person.character }
              </Text>
            </View>
          </Col>
        </Row>
      </TouchableOpacity>
    );
  }
}

