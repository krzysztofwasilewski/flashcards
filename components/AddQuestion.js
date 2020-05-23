import React, {useState, useCallback} from 'react';
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  Button,
  StyleSheet
} from 'react-native';

import {addQuestion} from '../actions/questions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const style = StyleSheet.create({
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  label: {
    paddingVertical: 10,
    paddingHorizontal: 10
  }
});

const AddQuestion = ({
  addQuestion,
  route: {
    params: {id}
  }
}) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const handleAdd = useCallback(() => {
    addQuestion(id, {question, answer});
    setQuestion('');
    setAnswer('');
  });
  return (
    <KeyboardAvoidingView>
      <Text style={style.label}>Question:</Text>
      <TextInput
        maxLength={100}
        style={style.input}
        value={question}
        onChangeText={setQuestion}
        placeholder='eg. function to return a list of all property keys'
      />
      <Text style={style.label}>Answer:</Text>
      <TextInput
        maxLength={100}
        style={style.input}
        value={answer}
        onChangeText={setAnswer}
        placeholder='eg. Object.keys()'
      />
      <Button
        title='Submit'
        onPress={handleAdd}
        disabled={!question.trim() || !answer.trim()}
      />
    </KeyboardAvoidingView>
  );
};

AddQuestion.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

const mapDispatchToProps = {
  addQuestion
};
export default connect(null, mapDispatchToProps)(AddQuestion);
