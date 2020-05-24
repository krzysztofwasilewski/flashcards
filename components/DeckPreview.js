import React, {useRef} from 'react';
import {FlatList} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';
import {connect} from 'react-redux';
import DeckCover from './DeckCover';
import PropTypes from 'prop-types';

const mapStateToProps = ({decks}) => ({
  decks: Object.values(decks)
});

const ITEM_HEIGHT = 200;
const DeckPreview = ({decks}) => {
  const listRef = useRef(null);
  useScrollToTop(listRef);
  return (
    <FlatList
      contentContainerStyle={{alignItems: 'stretch'}}
      ref={listRef}
      renderItem={({item: {id, title, deck}}) => {
        return <DeckCover id={id} title={title} questionNum={deck.length} />;
      }}
      numColumns={2}
      data={decks}
      keyExtractor={({id}) => id}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index
      })}
    />
  );
};

export default connect(mapStateToProps)(DeckPreview);
DeckPreview.propTypes = {
  decks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      deck: PropTypes.array.isRequired
    })
  )
};
