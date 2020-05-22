import React, {useState} from 'react';
import {Text, TextInput, KeyboardAvoidingView, Button} from 'react-native';

const EditDeck = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  return (
    <KeyboardAvoidingView>
      <Text>Question:</Text>
      <TextInput
        value={question}
        onChangeText={setQuestion}
        placeholder='eg. function to return a list of all property keys'
      />
      <Text>Answer:</Text>
      <TextInput
        value={answer}
        onChangeText={setAnswer}
        placeholder='eg. Object.keys()'
      />
      <Button title='Add' onPress={null} />
    </KeyboardAvoidingView>
  );
};
export default EditDeck;
