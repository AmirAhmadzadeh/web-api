import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ConfigureStore from './store/configureStore';

const store = ConfigureStore();

ReactDOM.render(
    <Provider store={store} >
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// serviceWorker.unregister();
