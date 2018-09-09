import React, {Component} from 'react';
//import * as API from '../api/API';
import './homepage.css';
import {Button} from 'react-bootstrap'
import Header from "./Header";
import {geolocated} from 'react-geolocated'

class HomePage extends Component {

    handleSubmit = (data) => {

        console.log("button clicked");

        var payload = {
            latitude : this.props.coords.latitude,
            longitude : this.props.coords.longitude,
            type : data
        }

        console.log("The current state ");
        console.log(payload);
    }

    render() {
        console.log(this.state);
        return (
            <div >

                <Header/>
                <br/>

                <Button className="btn btn-danger btn-lg btn-block btn-huge" onClick={()=>this.handleSubmit("Help")}>Need help</Button>
                <br/>
                <br/>
                <Button className="btn btn-success btn-lg btn-block btn-huge" onClick={()=>this.handleSubmit("Provide")}>Provide help </Button>
                <br/>
                <br/>
                <Button className="btn btn-primary btn-lg btn-block btn-huge" onClick={()=>this.handleSubmit("Professional")}>Professional</Button>
                <br/>
                <br/>
                <br/>
                <br/>

            </div>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(HomePage);

