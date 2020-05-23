import { combineReducers } from 'redux'
import decks from './decks'
import currentGame from './currentGame'

export default combineReducers({ decks, currentGame })