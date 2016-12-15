import React, { Component } from 'react';
import { render }           from 'react-dom';
import { OAuthProvider }         from '../src/index';
import { providerConfig }   from './config';

class App extends Component {
  constructor(props) {
    super(props);
  }

  onOAuthProviderLogin(data) {
    window.localStorage.setItem('OAuthProvider_token', data.code || data);
  }

  onOAuthProviderLoginFailure (err) {
    console.error(err);
  }

  render() {
    return (
      <div>
        Hello world
        <OAuthProvider
          config={providerConfig}
          successCallback={this.onOAuthProviderLogin}
          errorCallback={this.onOAuthProviderLoginFailure}
          textDisplay='OAuthProvider Sign-in'
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
