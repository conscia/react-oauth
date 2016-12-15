'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OAuth = require('./OAuth2');

var _OAuth2 = _interopRequireDefault(_OAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OAuthProvider = function OAuthProvider(props) {
  var config = props.config,
      textDisplay = props.textDisplay,
      className = props.className,
      successCallback = props.successCallback,
      errorCallback = props.errorCallback;

  config.successCallback = successCallback;
  config.errorCallback = errorCallback;
  return _react2.default.createElement(
    _OAuth2.default,
    config,
    _react2.default.createElement(
      'button',
      { className: className },
      textDisplay
    )
  );
};

OAuthProvider.defaultProps = {
  textDisplay: 'Sign in with OAuthProvider'
};

OAuthProvider.propTypes = {
  config: _react.PropTypes.object.isRequired,
  textDisplay: _react.PropTypes.string,
  className: _react.PropTypes.string
};

exports.default = OAuthProvider;