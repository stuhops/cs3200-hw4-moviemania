import React from 'react';
import { Col, Row} from 'react-native-easy-grid';
import { Container, Text, Button } from 'native-base';
import { Image, StyleSheet, View, ScrollView, FlatList } from 'react-native';

import MoviesService from '../../../services/movies.service';

export default class HomePage1 extends React.Component {
  state = {
    movie: {},
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


  setGenres() {
    console.log(this.state.movie.genres.length);
    // for(let i = 0; i < this.state.movie.genres.length; i++) {

    // }
  }


  async componentDidMount(){
    try {
      // const TEMPORARY = {"adult": false, "backdrop_path": "/uozb2VeD87YmhoUP1RrGWfzuCrr.jpg", "belongs_to_collection": null, "budget": 75000000, "genres": [{"id": 28, "name": "Action"}, {"id": 80, "name": "Crime"}, {"id": 35, "name": "Comedy"}], "homepage": "http://www.birdsofpreymovie.net/", "id": 495764, "imdb_id": "tt7713068", "original_language": "en", "original_title": "Birds of Prey (and the Fantabulous Emancipation of One Harley Quinn)", "overview": "After her breakup with the Joker, Harley Quinn joins forces with singer Black Canary, assassin Huntress, and police detective Renee Montoya to help a young girl named Cassandra, who had a hit placed on her after she stole a rare diamond from crime lord Roman Sionis.", "popularity": 160.411, "poster_path": "/h4VB6m0RwcicVEZvzftYZyKXs6K.jpg", "production_companies": [{"id": 9993, "logo_path": "/2Tc1P3Ac8M479naPp1kYT3izLS5.png", "name": "DC Entertainment", "origin_country": "US"}, {"id": 82968, "logo_path": null, "name": "LuckyChap Entertainment", "origin_country": "GB"}, {"id": 103462, "logo_path": null, "name": "Kroll & Co Entertainment", "origin_country": "US"}, {"id": 174, "logo_path": "/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png", "name": "Warner Bros. Pictures", "origin_country": "US"}, {"id": 429, "logo_path": "/2Tc1P3Ac8M479naPp1kYT3izLS5.png", "name": "DC Comics", "origin_country": "US"}, {"id": 128064, "logo_path": null, "name": "DC Films", "origin_country": "US"}, {"id": 101831, "logo_path": "/l6x0SkRVp9ksGgRhboZbkI9w7PM.png", "name": "Clubhouse Pictures", "origin_country": "US"}], "production_countries": [{"iso_3166_1": "US", "name": "United States of America"}], "release_date": "2020-02-05", "revenue": 173426018, "runtime": 109, "spoken_languages": [{"iso_639_1": "en", "name": "English"}], "status": "Released", "tagline": "Mind Over Mayhem", "title": "Birds of Prey (and the Fantabulous Emancipation of One Harley Quinn)", "video": false, "vote_average": 6.8, "vote_count": 799}

      const movie = await MoviesService.getMovieInfo(this.props.route.params.movie.id);
      this.setState({movie}, () => {
        let genres = this.state.movie.genres[0].name;
        for(let i = 1; i < this.state.movie.genres.length; i++) {
          genres += ', ' + this.state.movie.genres[i].name;
        }
        this.setState({genres});
      });
    } catch (e) {
      console.log(e);
    }
  }




  render() {
    const { navigation } = this.props.route.params;
    return (
      <Container>
        <ScrollView nestedScrollEnabled={true}>
          <Text style={this.styles.movieTitle}>{ this.state.movie.title }</Text>
          <View style={this.styles.container}>
            <View style={this.styles.imgContainer}>
              <Image 
                source={{uri: `https://image.tmdb.org/t/p/w200${this.state.movie.poster_path}`}}
                style={this.styles.imgThumbnail}
              />
            </View>
            <Text style={this.styles.movieInfo}>
              { this.state.movie.overview }
            </Text>
          </View>
          <View style={this.styles.container}>
            <Text style={this.styles.movieStats}>Release Date: { this.state.movie.release_date }</Text>
            <Text style={this.styles.movieStats}>{ this.state.movie.vote_average } / 10</Text>
            <Text style={this.styles.movieStats}>Genres: { this.state.genres }</Text>
          </View>
          <View style={this.styles.container}>
            <Text style={this.styles.movieStats}>Budget: ${ this.state.movie.budget }</Text>
            <Text style={this.styles.movieStats}>Revenue: ${ this.state.movie.revenue }</Text>
          </View>

          <Button full={true} onPress={() => this.props.navigation.navigate('Cast List', {cast: this.state.movie.cast})}>
            <Text>View Cast List</Text>
          </Button>
        </ScrollView>
      </Container>
    );
  }
}
