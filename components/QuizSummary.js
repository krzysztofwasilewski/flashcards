import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import {resetScore} from '../actions/currentGame';

const style = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-around'
  },
  textItem: {
    marginVertical: 10,
    textAlign: 'center'
  },
  result: {
    fontWeight: 'bold'
  },
  correct: {color: 'green'},
  wrong: {color: 'red'},
  resultContainer: {justifyContent: 'center'}
});

const QuizSummary = ({
  correctAnswerNum,
  wrongAnswerNum,
  totalNum,
  navigation
  //   resetScore
}) => (
  <View style={style.root}>
    <View style={style.resultContainer}>
      <Text style={style.textItem}>Correct answers:</Text>
      <Text style={[style.textItem, style.result, style.correct]}>
        {correctAnswerNum}/{totalNum}
      </Text>
      <Text style={style.textItem}>Wrong answers:</Text>
      <Text style={[style.textItem, style.result, style.wrong]}>
        {wrongAnswerNum}/{totalNum}
      </Text>
    </View>
    <Button
      title='Restart Quiz'
      onPress={() => {
        navigation.navigate('card', {questionId: 0});
      }}
    />
    <Button
      title='Back to deck'
      onPress={() => {
        navigation.navigate('deckStart');
      }}
    />
  </View>
);

QuizSummary.propTypes = {
  correctAnswerNum: PropTypes.number.isRequired,
  wrongAnswerNum: PropTypes.number.isRequired,
  totalNum: PropTypes.number.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps({currentGame: {correctAnswerNum, wrongAnswerNum}}) {
  return {
    correctAnswerNum,
    wrongAnswerNum,
    totalNum: correctAnswerNum + wrongAnswerNum
  };
}

export default connect(mapStateToProps)(QuizSummary);
