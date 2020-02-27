import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Container } from 'native-base';
import CastListItem from './cast_list_item';

export default class Index extends React.Component {
  state = {
    currentPage: 1,
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
          data={this.props.route.params.cast.cast}
          renderItem={(dataEntry) => {
            return <CastListItem
                      person={dataEntry.item}
                      onPress={() => this.props.navigation.navigate('Profile', {person: dataEntry.item})}
                  />
          }}
          ItemSeparatorComponent={this.renderSeparator}
          // keyExtractor={(movie) => `movie_${movie.id}`}
        />
      </Container>
    );
  }
}
