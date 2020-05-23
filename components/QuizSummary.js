import React from 'react';
import {View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import {resetScore} from '../actions/currentGame';

const QuizSummary = ({
  correctAnswerNum,
  wrongAnswerNum,
  totalNum,
  navigation
  //   resetScore
}) => (
  <View>
    <Text>Correct answers:</Text>
    <Text>
      {correctAnswerNum}/{totalNum}
    </Text>
    <Text>Wrong answers:</Text>
    <Text>
      {wrongAnswerNum}/{totalNum}
    </Text>
    <Button
      title='Restart Quiz'
      onPress={() => {
        navigation.navigate('card', {questionId: 0});
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
