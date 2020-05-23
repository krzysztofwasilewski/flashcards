import React from 'react';
import {StatusBar, SafeAreaView, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {enableScreens} from 'react-native-screens';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import exampleDecks from './utils/examples';
import {DeckView} from './components/DeckView';
import DeckPreview from './components/DeckPreview';
import NewDeck from './components/NewDeck';
import reducers from './reducers';
import middleware from './middleware';

enableScreens();
const Stack = createStackNavigator();

const store = createStore(reducers, {decks: exampleDecks}, middleware);

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle='dark-content' backgroundColor='white' />
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen
              name='Home'
              component={DeckPreview}
              options={({navigation}) => ({
                // eslint-disable-next-line react/display-name, react/prop-types
                headerRight: ({tintColor}) => (
                  <Button
                    title='New deck'
                    color={tintColor}
                    onPress={() => navigation.navigate('New deck')}
                  />
                ),
                headerRightContainerStyle: {paddingHorizontal: 10}
              })}
            />
            <Stack.Screen name='Deck' component={DeckView} />
            <Stack.Screen name='New deck' component={NewDeck} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}
