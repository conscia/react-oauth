import React, { PropTypes } from 'react';
import OAuth2               from './OAuth2';

export const styles = {
  button: {
    backgroundColor: 'steelblue'
  }
};

const Conscia = props => {
  const { config, textDisplay, style, successCallback, errorCallback } = props;
  let baseStyles = [styles.button];
  if (style) baseStyles.push(style);
  config.successCallback = successCallback;
  config.errorCallback = errorCallback;
  return (
    <OAuth2 {...config}>
      <button style={baseStyles}>{textDisplay}</button>
    </OAuth2>
  );
};

Conscia.defaultProps = {
  textDisplay: 'Sign in with Conscia'
};

Conscia.propTypes = {
  config     : PropTypes.object.isRequired,
  textDisplay: PropTypes.string,
  style      : PropTypes.object
};

export default Conscia;
