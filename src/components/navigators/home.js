import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Index from '../screens/browse/index';
import MoviesByGenre from '../screens/browse/movies_by_genre';
import MovieInfo from '../screens/info/movie_info';
import CastList from '../screens/info/cast_list';
import SearchMovie from '../screens/search/search';
const Stack = createStackNavigator();

export default class HomeNavigator extends React.Component {

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Browse" component={Index} />
        <Stack.Screen name="Movies By Genre" component={MoviesByGenre} />
        <Stack.Screen name="Movie Info" component={MovieInfo} />
        <Stack.Screen name="Cast List" component={CastList} />
        <Stack.Screen name="Search" component={SearchMovie} />
      </Stack.Navigator>
    );
  }
}
