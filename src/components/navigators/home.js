import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Index from '../screens/browse/index';
import MovieInfo from '../screens/info/movie_info';
const Stack = createStackNavigator();

export default class HomeNavigator extends React.Component {

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Browse" component={Index} />
        <Stack.Screen name="Movie Info" component={MovieInfo} />
      </Stack.Navigator>
    );
  }
}
