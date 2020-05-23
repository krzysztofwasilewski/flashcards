import React, {useState, useRef, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Button, Animated} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {correctAnswer, wrongAnswer, resetScore} from '../actions/currentGame';

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
  buttonContainer: {flexDirection: 'row', justifyContent: 'space-around'}
});
const CardView = ({
  question,
  answer,
  isLast,
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
  const fadeAnswerIn = useCallback(() =>
    Animated.timing(animatedRef, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start()
  );

  useEffect(() => {
    setResult('');
    setDisclosed(false);
    animatedRef.setValue(0);
    if (!questionId) {
      resetScore();
    }
  }, [id, questionId]);

  const handleNextOrFinish = () => {
    result === 'correct' ? correctAnswer() : wrongAnswer();
    isLast
      ? navigation.navigate('summary')
      : setParams({...params, questionId: params.questionId + 1});
  };
  return (
    <View style={style.root}>
      <Text style={style.question}>{question}</Text>
      <Animated.Text style={[style.answer, {opacity: animatedRef}]}>
        {answer}
      </Animated.Text>
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
          title='Correct'
          color={result === 'correct' ? 'green' : 'grey'}
          onPress={() => {
            setResult('correct');
          }}
          disabled={!disclosed}
        />
        <Button
          title='Incorrect'
          color={result === 'wrong' ? 'red' : 'grey'}
          onPress={() => {
            setResult('wrong');
          }}
          disabled={!disclosed}
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
    isLast: questionId === decks[id].deck.length - 1
  };
}

const mapDispatchToProps = {
  correctAnswer,
  wrongAnswer,
  resetScore
};
export default connect(mapStateToProps, mapDispatchToProps)(CardView);
