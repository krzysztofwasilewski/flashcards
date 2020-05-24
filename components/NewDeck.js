import React, {useState} from 'react';
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  Button,
  StyleSheet
} from 'react-native';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addDeck} from '../actions/questions';
import randomId from '../utils/randomId';

const style = StyleSheet.create({
  root: {flex: 1, justifyContent: 'flex-start'},
  contentItem: {marginHorizontal: 10, marginVertical: 5},
  input: {marginHorizontal: 20}
});
const NewDeck = ({addDeck, navigation}) => {
  const [title, setTitle] = useState('');
  const handleSaveTitle = () => {
    const id = randomId(20);
    addDeck({title, id});
    navigation.goBack();
    navigation.navigate('Deck', {
      id,
      title,
      screen: 'Add card',
      params: {id, title}
    });
  };

  return (
    <KeyboardAvoidingView style={style.root}>
      <Text style={style.contentItem}>Title:</Text>
      <TextInput
        style={[style.contentItem, style.input]}
        placeholder='What this quiz is about'
        onChangeText={setTitle}
        autoFocus
      />
      <Button
        title='Create Deck'
        disabled={!title.trim()}
        onPress={handleSaveTitle}
      />
    </KeyboardAvoidingView>
  );
};

NewDeck.propTypes = {
  addDeck: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }).isRequired
};
const mapDispatchToProps = {
  addDeck
};

export default connect(null, mapDispatchToProps)(NewDeck);
