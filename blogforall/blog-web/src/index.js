import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from './context/BlogContext';
import App from './components/App';


ReactDOM.render(
  <Provider>
    <App />
   </Provider>, 
 
  document.getElementById('root')
);

