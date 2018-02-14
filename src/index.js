//import React from 'react';
//import ReactDOM from 'react-dom';
//import './index.css';
//import App from './components/App/App';
//import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import createStore from './store';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

const store = createStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);
