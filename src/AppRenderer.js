import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import openSocket from 'socket.io-client';
import { configureStore } from './redux/store';

const socket = openSocket();
const App = React.lazy(() => import('./App'));

ReactDOM.render(
  <Provider store={configureStore()}>
    <Suspense fallback={<div className="loading" />}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

export { socket };
