import React, { Component } from 'react';
import { render }           from 'react-dom';
import { Conscia }         from '../src/index';
import { configConscia }   from './config';

class App extends Component {
  constructor(props) {
    super(props);
  }

  onConsciaLogin(data) {
    window.localStorage.setItem('conscia_token', data.code || data);
  }

  onConsciaLoginFailure (err) {
    console.error(err);
  }

  render() {
    return (
      <div>
        Hello world
        <Conscia
          config={configConscia}
          successCallback={this.onConsciaLogin}
          errorCallback={this.onConsciaLoginFailure}
          textDisplay='Conscia Sign-in'
        />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
