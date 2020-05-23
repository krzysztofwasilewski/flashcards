import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const style = StyleSheet.create({
  root: {
    flex: 1
  }
});
const DeckStartPage = ({
  route: {
    params: {id}
  },
  title,
  numQuestions,
  navigation
}) => {
  return (
    <View style={style.root}>
      <Text>{title}</Text>
      <Text>{`Questions in the deck: ${numQuestions}`}</Text>
      <Button
        onPress={() => navigation.navigate('card', {id, questionId: 0})}
        disabled={!numQuestions}
        title='Start a Quiz'
      />
      {!numQuestions && (
        <Text>You can’t play an empty quiz. Add questions.</Text>
      )}
    </View>
  );
};

function mapStateToProps(
  {decks},
  {
    route: {
      params: {id}
    }
  }
) {
  return {
    title: decks[id].title,
    numQuestions: decks[id].deck.length
  };
}

DeckStartPage.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  title: PropTypes.string.isRequired,
  numQuestions: PropTypes.number.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
export default connect(mapStateToProps)(DeckStartPage);
