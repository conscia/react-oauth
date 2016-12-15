import React, { PropTypes } from 'react';
import OAuth2               from './OAuth2';

const OAuthProvider = props => {
  const { config, textDisplay, className, successCallback, errorCallback } = props;
  config.successCallback = successCallback;
  config.errorCallback = errorCallback;
  return (
    <OAuth2 {...config}>
      <button className={className}>{textDisplay}</button>
    </OAuth2>
  );
};

OAuthProvider.defaultProps = {
  textDisplay: 'Sign in with OAuthProvider'
};

OAuthProvider.propTypes = {
  config     : PropTypes.object.isRequired,
  textDisplay: PropTypes.string,
  className      : PropTypes.string
};

export default OAuthProvider;
