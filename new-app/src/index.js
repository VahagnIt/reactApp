import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import Login from './components/Login/Login'
import Footer from "./components/Footer/Footer";
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';

import rootReducer from "./Redux/rootReducers";
import {createStore} from "redux";
import {Provider} from "react-redux";


const store = createStore(rootReducer);
const application =
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>



ReactDOM.render(application, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
