import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';

const style = StyleSheet.create({
  root: {
    borderStyle: 'solid',
    borderColor: 'lightpink',
    borderWidth: 1,

    height: 200,
    justifyContent: 'space-around',
    backgroundColor: 'lavenderblush'
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

const DeckCover = ({title, questionNum, id}) => {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      underlayColor='black'
      activeOpacity={0.85}
      style={{width: '40%', margin: 10}}
      onPress={() => {
        navigation.navigate('Deck', {id, title});
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

export default DeckCover;
