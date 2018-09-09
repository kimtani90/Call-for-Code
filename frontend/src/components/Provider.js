import React, {Component} from 'react';
import {Map,Marker, GoogleApiWrapper} from 'google-maps-react';
import { Card, CardText, CardBody,CardImg,
    CardTitle, CardSubtitle,Button} from 'reactstrap';

import './provider.css';
export class Provider extends Component{

    state = {
        person : ''
}
    componentWillMount(){

        //call the api with the phone number

        const phone = window.location.search.substring(10);
        //make an api call with the variable phone number
        //get all the data in response from the request and store it in state
        //store the returned array in person state as objects.
    }


    // marker(){
    //
    //     return this.props.state.markers.map(marker, index) =>{    //this is error because marker is empty and not an array
    //         return(
    //             <Marker onClick = {()=>handleSubmit(index)}
    //                     position = {marker}/>
    //         )
    //     }
    //
    // }


    handleSubmit(index){

        //make an api call with the payload to the back end with the data as "this.state.markers[index]"

    }


    render(){
        return(

            <div className="wrapp">

                <br/>
                <h2> Select the person you want to help </h2>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>



           <div className="row">
               <div className="col-md-2">

               </div>
                <div className="col-md-8">
                    <Card>
                        <CardTitle>
                            Select the person you want to help
                        </CardTitle>

                        <Map google={this.props.google}
                             style={{width: '100%', height: '300px', position: 'relative'}}
                             className={'map'}
                             zoom={20}>
                            <Marker
                                title={'The marker`s title will appear as a tooltip.'}
                                name={'SOMA'}
                                position={{lat: 37.778519, lng: -122.405640}} />
                            {/*this.marker  uncomment his when you have the object*/}
                        </Map>
                        <CardBody>
                        </CardBody>
                    </Card>
                </div>
           </div>
            </div>



        );
    }

}


export default GoogleApiWrapper({
    apiKey: "AIzaSyBFqVMbP9atq6bNZP_vrup7JdZYGepQ-98"
})(Provider)