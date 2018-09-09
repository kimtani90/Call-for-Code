import React, {Component} from 'react';
import './homepage.css';
import { Route, withRouter } from 'react-router-dom';
import Provider from './Provider'
import HomePage from './HomePage'

class MainPage extends Component {


    render(){
        return (
            <div>
                <Route exact path="/provider" render={() => (
                <Provider/>
                )}/>
                <Route exact path="/" render={() => (
                <HomePage/>
                )}/>

            </div>
        );

    }

}


export default withRouter(MainPage);