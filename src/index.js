import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import './index.css';
import App from './App';
import Test from './Test'
import store from './redux'
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path={"/app"}>
                    <App></App>
                </Route>
                <Route path={"/test"}>
                    <Test></Test>
                </Route>
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
