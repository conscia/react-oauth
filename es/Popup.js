'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Popup = function (_React$Component) {
  _inherits(Popup, _React$Component);

  function Popup(props) {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).call(this, props));
  }

  _createClass(Popup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log(this.props);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.open) {
        this.openPopup();
      }
    }
  }, {
    key: 'openPopup',
    value: function openPopup() {
      var props = this.props;
      var width = props.width || 500;
      var height = props.height || 500;

      var options = {
        width: width,
        height: height,
        top: window.screenY + (window.outerHeight - height) / 2.5,
        left: window.screenX + (window.outerWidth - width) / 2
      };

      var popup = window.open(props.popupUrl, '_blank', _querystring2.default.stringify(options, ','));

      if (props.popupUrl === 'about:blank') {
        popup.document.body.innerHTML = 'Loading...';
      }

      this.pollPopup(popup).then(props.successCallback).catch(props.errorCallback);
    }
  }, {
    key: 'pollPopup',
    value: function pollPopup(window) {
      var props = this.props;
      var redirectUri = _url2.default.parse(props.redirectUri);
      var redirectUriPath = redirectUri.host + redirectUri.pathname;

      return new _bluebird2.default(function (resolve, reject) {
        var redirectUri = _url2.default.parse(props.redirectUri);
        var redirectUriPath = redirectUri.host + redirectUri.pathname;

        var polling = setInterval(function () {
          if (!window || window.closed || window.closed == undefined) {
            clearInterval(polling);
            reject(new Error('The popup window was closed'));
          }
          try {
            var popupUrlPath = window.location.host + window.location.pathname;

            if (popupUrlPath === redirectUriPath) {
              if (window.location.search || window.location.hash) {
                var query = _querystring2.default.parse(window.location.search.substring(1).replace(/\/$/, ''));
                var hash = _querystring2.default.parse(window.location.hash.substring(1).replace(/[\/$]/, ''));
                var params = Object.assign({}, query, hash);

                if (params.error) {
                  reject(new Error(params.error));
                } else {
                  resolve(params);
                }
              } else {
                reject(new Error('OAuth redirect has occurred but no query or hash parameters were found.'));
              }
              // cleanup
              clearInterval(polling);
              window.close();
            }
          } catch (error) {
            // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
            // A hack to get around same-origin security policy errors in Internet Explorer.
          }
        }, 500);
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      console.log('clicked on button');
    }
  }, {
    key: 'render',
    value: function render() {
      console.log('popup open?', this.props.open);
      return null;
    }
  }]);

  return Popup;
}(_react2.default.Component);

exports.default = Popup;