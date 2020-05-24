import React, {useState, useCallback, useRef} from 'react';
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  Animated,
  Platform,
  ToastAndroid
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
  },
  notification: {margin: 10, color: 'green'}
});

const AddQuestion = ({
  addQuestion,
  route: {
    params: {id}
  }
}) => {
  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const notificationOpacityRef = useRef(new Animated.Value(0)).current;

  const notificationAnimation = useCallback(() =>
    Animated.sequence([
      Animated.timing(notificationOpacityRef, {
        duration: 1000,
        toValue: 1,
        useNativeDriver: Platform.OS === 'ios' || Platform.OS === 'android'
      }), // Don't use the native driver for web or anything else.})
      Animated.timing(notificationOpacityRef, {
        duration: 1000,
        toValue: 0,
        useNativeDriver: Platform.OS === 'ios' || Platform.OS === 'android'
      }) // Don't use the native driver for web or anything else.})
    ]).start()
  );
  const handleAdd = useCallback(() => {
    addQuestion(id, {question, answer});
    setQuestion('');
    setAnswer('');
    firstInputRef.current && firstInputRef.current.focus();
    switch (Platform.OS) {
      case 'ios':
      case 'web':
        notificationAnimation();
        break;
      case 'android':
        ToastAndroid.showWithGravity(
          'The question has been added',
          ToastAndroid.SHORT,
          ToastAndroid.TOP
        );
        break;
      default:
        break;
    }
  }, [id, question, answer]);
  return (
    <KeyboardAvoidingView>
      {Platform.OS !== 'android' && (
        <Animated.Text
          style={[style.notification, {opacity: notificationOpacityRef}]}
        >
          The question has been added
        </Animated.Text>
      )}
      <Text style={style.label}>Question:</Text>
      <TextInput
        maxLength={100}
        style={style.input}
        value={question}
        onChangeText={setQuestion}
        placeholder='eg. function to return a list of all property keys'
        autoFocus
        ref={firstInputRef}
        returnKeyType={'next'}
        onSubmitEditing={() =>
          secondInputRef.current && secondInputRef.current.focus()
        }
      />
      <Text style={style.label}>Answer:</Text>
      <TextInput
        maxLength={100}
        style={style.input}
        value={answer}
        onChangeText={setAnswer}
        placeholder='eg. Object.keys()'
        ref={secondInputRef}
        returnKeyType={'done'}
        onSubmitEditing={() => question.trim() && answer.trim() && handleAdd()}
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
