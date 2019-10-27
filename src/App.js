import React from 'react';
import logo from './logo.svg';
import {load100RecordInNormal} from "./communications/firebase";
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        console.log(load100RecordInNormal(1))

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload Hello.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
