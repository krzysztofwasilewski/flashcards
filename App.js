import React from 'react';
import {StatusBar, SafeAreaView, FlatList} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import decks from './reducers/decks';
import exampleDecks from './utils/examples';
import {DeckCover} from './components/DeckCover';
import {DeckView} from './components/DeckView';
import PropTypes from 'prop-types';

enableScreens();
const Stack = createStackNavigator();

const store = createStore(combineReducers({decks}), {decks: exampleDecks});

const mapStateToProps = ({decks}) => ({
  decks: Object.values(decks)
});

const DeckPreview = ({decks}) => (
  <FlatList
    renderItem={({item: {id, title, deck}}) => {
      return <DeckCover id={id} title={title} questionNum={deck.length} />;
    }}
    data={decks}
    keyExtractor={({id}) => id}
  />
);

const DeckPreviewWrapper = connect(mapStateToProps)(DeckPreview);
DeckPreview.propTypes = {
  decks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      deck: PropTypes.array.isRequired
    })
  )
};

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' component={DeckPreviewWrapper} />
            <Stack.Screen name='Deck' component={DeckView} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}
