import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default class GenreListItem extends React.Component {
  styles = StyleSheet.create({
    listItem: {
      padding: 24,
    },
    movieTitle: {
      fontSize: 24,
    }
  })

  render() {
    const { onPress, genre } = this.props;
    return (
      <TouchableOpacity onPress={ onPress }>
        <View style={this.styles.listItem}>
          <Text style={this.styles.movieTitle}>{ genre.item.name }</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
