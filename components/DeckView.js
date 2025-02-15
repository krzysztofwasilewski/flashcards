import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PlayScreen from './PlayScreen';
import AddQuestion from './AddQuestion';
import PropTypes from 'prop-types';
import {FontAwesome5} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const DeckView = ({route, navigation}) => {
  navigation.setOptions({headerTitle: route.params.title});
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Play'
        initialParams={{questionId: 0, ...route.params}}
        component={PlayScreen}
        options={{
          // eslint-disable-next-line react/display-name, react/prop-types
          tabBarIcon: ({size, color}) => (
            <FontAwesome5 name='play' size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name='Add card'
        component={AddQuestion}
        initialParams={route.params}
        options={{
          // eslint-disable-next-line react/display-name, react/prop-types
          tabBarIcon: ({size, color}) => (
            <FontAwesome5 name='edit' size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

DeckView.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,

  navigation: PropTypes.shape({setOptions: PropTypes.func.isRequired})
};
