import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';

const style = StyleSheet.create({
  root: {
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderWidth: 1,

    height: 200,
    justifyContent: 'space-around',
    backgroundColor: 'red'
  },
  titleText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  countText: {
    textAlign: 'center',
    fontSize: 32
  }
});

export const DeckCover = ({title, questionNum, id}) => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      underlayColor='blue'
      activeOpacity={0.85}
      style={{width: '40%', margin: 5}}
      onPress={() => {
        navigation.navigate('Deck', {id});
      }}
    >
      <View style={style.root}>
        <Text style={style.titleText}>{title}</Text>
        <Text style={style.countText}>{questionNum.toFixed(0)}</Text>
      </View>
    </TouchableHighlight>
  );
};

DeckCover.propTypes = {
  title: PropTypes.string,
  questionNum: PropTypes.number,
  id: PropTypes.string
};
