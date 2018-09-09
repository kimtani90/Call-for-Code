import React, {Component} from 'react';
import './App.css';
import MainPage from "./components/MainPage";
import {BrowserRouter} from "react-router-dom";
import HomePage from "./components/HomePage"


    class App extends Component {
        render() {
            return (
                <div className="App">
                    <BrowserRouter>
                        <MainPage/>
                    </BrowserRouter>
                </div>
            );
        }
    }

    export default App;
