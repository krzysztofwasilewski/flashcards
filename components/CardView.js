import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Button, Animated} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import PropTypes from 'prop-types';

const style = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-around'
  },
  question: {
    textAlign: 'center',
    marginHorizontal: 20
  },
  answer: {
    textAlign: 'center',
    marginHorizontal: 20
  },
  correctSelected: {
    backgroundColor: 'green'
  },
  wrongSelected: {
    backgroundColor: 'red'
  },
  unselected: {
    backgroundColor: 'grey'
  },
  buttonContainer: {flexDirection: 'row', justifyContent: 'space-around'}
});
const CardView = ({question, answer, isLast, id, questionId}) => {
  const {setParams} = useNavigation();
  const {params} = useRoute();
  const [disclosed, setDisclosed] = useState(false);
  const [result, setResult] = useState('');
  const animatedRef = useRef(new Animated.Value(0)).current;
  const fadeAnswerIn = () =>
    Animated.timing(animatedRef, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();

  useEffect(() => {
    setResult('');
    setDisclosed(false);
    animatedRef.setValue(0);
  }, [id, questionId]);
  return (
    <View style={style.root}>
      <Text style={style.question}>{question}</Text>
      <Animated.Text style={[style.answer, {opacity: animatedRef}]}>
        {answer}
      </Animated.Text>
      <View style={style.buttonContainer}>
        <Button
          title='Disclose'
          onPress={() => {
            fadeAnswerIn();
            setDisclosed(true);
          }}
          disabled={disclosed}
        />
        <Button
          title={isLast ? 'Finish' : 'Next'}
          onPress={() =>
            setParams({...params, questionId: params.questionId + 1})
          }
          disabled={isLast || !disclosed || !result}
        />
        <Button
          title='Correct'
          color={result === 'correct' ? 'green' : 'grey'}
          onPress={() => {
            setResult('correct');
          }}
          disabled={!disclosed}
        />
        <Button
          title='Wrong'
          color={result === 'wrong' ? 'red' : 'grey'}
          onPress={() => {
            setResult('wrong');
          }}
          disabled={!disclosed}
        />
      </View>
    </View>
  );
};

CardView.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired
};

function mapStateToProps({decks}, {id, questionId}) {
  console.log(id, questionId, decks);
  return {
    question: decks[id].deck[questionId].question,
    answer: decks[id].deck[questionId].answer,
    isLast: questionId === decks[id].deck.length - 1
  };
}
export default connect(mapStateToProps)(CardView);
