import React from 'react';
import { Router } from 'react-router-dom';

import { Router as AppRouter, history } from './routes';

function App() {
  return (
    <Router history={history}>
      <AppRouter />
    </Router>
  );
}

export default App;
