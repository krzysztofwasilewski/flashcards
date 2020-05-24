import React, {useState, useRef, useCallback} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Button, Text, Animated, Platform} from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect
} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {correctAnswer, wrongAnswer, resetScore} from '../actions/currentGame';

const style = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-around'
  },
  question: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20
  },
  answer: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20
  },
  counter: {
    margin: 20,
    textAlign: 'right'
  },
  label: {textAlign: 'left', paddingLeft: 10},
  buttonContainer: {flexDirection: 'row', justifyContent: 'space-around'}
});
const CardView = ({
  question,
  answer,
  isLast,
  totalNumInDeck,
  route: {
    params: {id, questionId}
  },
  navigation,
  correctAnswer,
  wrongAnswer,
  resetScore
}) => {
  const {setParams} = useNavigation();
  const {params} = useRoute();
  const [disclosed, setDisclosed] = useState(false);
  const [result, setResult] = useState('');
  const animatedRef = useRef(new Animated.Value(0)).current;
  const fadeAnswerIn = useCallback(
    () =>
      Animated.timing(animatedRef, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: Platform.OS === 'ios' || Platform.OS === 'android' // Don't use the native driver for web or anything else.
      }).start(),
    [animatedRef]
  );
  const resetScreen = useCallback(() => {
    setResult('');
    setDisclosed(false);
    animatedRef.setValue(0);
    if (!questionId) {
      resetScore();
    }
  }, [id, questionId]);
  useFocusEffect(resetScreen); // The deck ID together with the question index are effectively our compound key. we are reseeting the view when they change which indicates that the user started answering a new question.

  const handleNextOrFinish = () => {
    result === 'correct' ? correctAnswer() : wrongAnswer();
    isLast
      ? navigation.navigate('summary')
      : setParams({...params, questionId: params.questionId + 1});
  };
  return (
    <View style={style.root}>
      <Text style={style.counter}>{`${totalNumInDeck - questionId} to go (#${
        questionId + 1
      } of ${totalNumInDeck})`}</Text>
      <Animated.Text
        style={[
          style.label,
          {
            opacity: Animated.multiply(
              new Animated.Value(-1),
              Animated.add(new Animated.Value(-1), animatedRef)
            )
          }
        ]}
      >
        Quesiton:
      </Animated.Text>
      <Animated.Text
        style={[
          style.question,
          {
            opacity: Animated.multiply(
              new Animated.Value(-1),
              Animated.add(new Animated.Value(-1), animatedRef)
            )
          }
        ]}
      >
        {question}
      </Animated.Text>
      <Animated.Text style={[style.label, {opacity: animatedRef}]}>
        Answer:
      </Animated.Text>
      <Animated.Text style={[style.answer, {opacity: animatedRef}]}>
        {answer}
      </Animated.Text>

      <View style={style.buttonContainer}>
        <Button
          title='Correct'
          color={result === 'correct' ? 'green' : null}
          onPress={() => {
            setResult('correct');
          }}
          disabled={!disclosed}
        />
        <Button
          title='Incorrect'
          color={result === 'wrong' ? 'red' : null}
          onPress={() => {
            setResult('wrong');
          }}
          disabled={!disclosed}
        />
      </View>

      <View style={style.buttonContainer}>
        <Button
          title='Show Answer'
          onPress={() => {
            fadeAnswerIn();
            setDisclosed(true);
          }}
          disabled={disclosed}
        />
        <Button
          title={isLast ? 'Finish' : 'Next'}
          onPress={handleNextOrFinish}
          disabled={!disclosed || !result}
        />
      </View>
    </View>
  );
};

CardView.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
  totalNumInDeck: PropTypes.number.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      questionId: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  correctAnswer: PropTypes.func.isRequired,
  wrongAnswer: PropTypes.func.isRequired,
  resetScore: PropTypes.func.isRequired
};

function mapStateToProps(
  {decks},
  {
    route: {
      params: {id, questionId}
    }
  }
) {
  return {
    question: decks[id].deck[questionId].question,
    answer: decks[id].deck[questionId].answer,
    isLast: questionId === decks[id].deck.length - 1,
    totalNumInDeck: decks[id].deck.length
  };
}

const mapDispatchToProps = {
  correctAnswer,
  wrongAnswer,
  resetScore
};
export default connect(mapStateToProps, mapDispatchToProps)(CardView);
