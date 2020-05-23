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
  root: {flex: 1, justifyContent: 'space-around'}
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
      <Text>Title</Text>
      <TextInput
        placeholder='What this quic is about'
        onChangeText={setTitle}
      />
      <Button title='Save' disabled={!title.trim()} onPress={handleSaveTitle} />
    </KeyboardAvoidingView>
  );
};

NewDeck.propTypes = {
  addDeck: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
const mapDispatchToProps = {
  addDeck
};

export default connect(null, mapDispatchToProps)(NewDeck);
