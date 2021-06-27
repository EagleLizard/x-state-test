
import React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app/app';

import './main.scss';

const Index = () => {
  return (
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  );
};

ReactDOM.render(<Index />, document.getElementById('app-root'));
