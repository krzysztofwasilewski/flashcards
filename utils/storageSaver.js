import {AsyncStorage} from 'react-native';

const DATA_KEY = 'flashcards:data';

export function storeState(data) {
  console.log('writing to store', JSON.stringify(data));
  AsyncStorage.setItem(DATA_KEY, JSON.stringify(data));
}

export function loadState() {
  return AsyncStorage.getItem(DATA_KEY).then(JSON.parse);
}
