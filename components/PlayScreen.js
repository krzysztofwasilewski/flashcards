import React from 'react';
import CardView from './CardView';
import PropTypes from 'prop-types';

const PlayScreen = ({route: {params}}) => <CardView {...params}></CardView>;

export default PlayScreen;

PlayScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired
};
