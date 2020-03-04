
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MoviesByGenre from '../screens/browse/movies_by_genre';
import MovieInfo from '../screens/info/movie_info';
import CastList from '../screens/info/cast_list';
import Profile from '../screens/info/profile';
import MoviesByPerson from '../screens/browse/movies_by_person';
import SearchMovie from '../screens/search/search';
const Stack = createStackNavigator();

export default class SearchNavigator extends React.Component {

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchMovie} />
        <Stack.Screen name="Movies By Genre" component={MoviesByGenre} />
        <Stack.Screen name="Movies By Person" component={MoviesByPerson} />
        <Stack.Screen name="Movie Info" component={MovieInfo} />
        <Stack.Screen name="Cast List" component={CastList} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    );
  }
}
