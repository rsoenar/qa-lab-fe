import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';

class Main extends PureComponent {
  render() {
    return <Redirect to="/app" />;
  }
}

export default Main;
