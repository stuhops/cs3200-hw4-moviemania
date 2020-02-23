import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    return (
      <View style={this.styles.listItem} onPress={ this.props.onPress }>
        <Text style={this.styles.movieTitle}>{ this.props.genre.item.name }</Text>
      </View>
    );
  }
}
