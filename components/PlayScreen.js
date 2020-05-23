import React from 'react';
import CardView from './CardView';
import PropTypes from 'prop-types';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import QuizSummary from './QuizSummary';
import DeckStartPage from './DeckStartPage';

const Stack = createStackNavigator();

const PlayScreen = ({route: {params}, title}) => (
  <Stack.Navigator headerMode='none' mode='modal'>
    <Stack.Screen
      name='deckStart'
      options={{headerTitle: title}}
      component={DeckStartPage}
      initialParams={params}
    />
    <Stack.Screen
      name='card'
      options={{headerTitle: title}}
      component={CardView}
      initialParams={params}
    />
    <Stack.Screen
      name='summary'
      options={{headerTitle: title}}
      component={QuizSummary}
      initialParams={params}
    />
  </Stack.Navigator>
);
export default connect(mapStateToProps)(PlayScreen);

function mapStateToProps({decks}, {route: {params}}) {
  return {
    title: decks[params.id].title
  };
}
PlayScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired,
  title: PropTypes.string.isRequired
};
