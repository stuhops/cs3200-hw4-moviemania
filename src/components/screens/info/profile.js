import React from 'react';
import { Container, Text, Button } from 'native-base';
import { Image, StyleSheet, View, ScrollView} from 'react-native';

import MoviesService from '../../../services/movies.service';

export default class Profile extends React.Component {
  state = {
    person: {},
  }

  styles = StyleSheet.create({
    main: {
      // backgroundColor: 'dark-gray',
    },
    imgThumbnail: {
      flex: 1,
      width: 150,
      height: 250,
    },
    imgContainer: {
      flex: 1,
    },
    movieTitle: {
      fontWeight: 'bold',
      fontSize: 36,
      textAlign: 'center',
      padding: 8,
      marginBottom: 24,
    },
    movieInfoContainer: {
      flexDirection: 'row',
    },
    movieInfo: {
      flex: 1,
      marginLeft: 16,
      fontSize: 16,
    },
    movieStats: {
      flex: 1,
      fontSize: 16,
      paddingRight: 8,
    },
    container: {
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 24,
      flexDirection: 'row',
    },

  })


  async componentDidMount() {
    try {
      const person = await MoviesService.getPersonalInfo(this.props.route.params.person.id);
      this.setState({ person, loading: false });
    } catch (e) {
      console.log(e);
    }
  }


  render() {
    const { person } = this.state
    return (
      <Container>
        <ScrollView>
    <Text style={this.styles.movieTitle}>{person.name}</Text>
          <View style={this.styles.container}>
            <View style={this.styles.imgContainer}>
              <Image 
                source={{uri: `https://image.tmdb.org/t/p/w200${person.profile_path}`}}
                style={this.styles.imgThumbnail}
              />
            </View>
            <Text style={this.styles.movieInfo}>
              Born: {person.birthday}
              {'\n'}
              {'\n'}
              Died: {person.deathday}
              {'\n'}
              {'\n'}
              Birth Place: {person.place_of_birth}
              {'\n'}
              {'\n'}
              Popularity: {person.popularity} / 10
              {'\n'}
              {'\n'}
              Known For: {person.known_for_department}
            </Text>
          </View>
          <View style={this.styles.container}>
            <Text>{person.biography}</Text>
          </View>

          <Button full={true} onPress={() => this.props.navigation.push('Movies By Person', {id: person.id})}>
            <Text>View Movie List</Text>
          </Button>
        </ScrollView>
      </Container>
    );
  }
}
