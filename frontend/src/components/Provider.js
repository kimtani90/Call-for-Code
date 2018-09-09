import React, {Component} from 'react';
import {Map,Marker, GoogleApiWrapper} from 'google-maps-react';
import { Card, CardText, CardBody,
    CardTitle, CardSubtitle,Button} from 'reactstrap';

export class Provider extends Component{

    componentWillMount(){

        //call the api with the phone number
        

    }

    render(){

        const triangleCoords = [
            {lat: 25.774, lng: -80.190},
            {lat: 18.466, lng: -66.118},
            {lat: 32.321, lng: -64.757},
            {lat: 25.774, lng: -80.190}
        ];

        return(

            <div className="col-md-6">
                <Card>
                    <Map google={this.props.google}
                         style={{width: '100%', height: '100%', position: 'relative'}}
                         className={'map'}
                         zoom={40}>
                        <Marker
                            title={'The marker`s title will appear as a tooltip.'}
                            name={'SOMA'}
                            position={triangleCoords[0]} />
                        <Marker
                            name={'Dolores park'}
                            position={triangleCoords[1]} />
                        <Marker />
                        <Marker
                            name={'Your position'}
                            position={triangleCoords[2]}
                        />
                        <Marker/>
                    </Map>
                    <CardBody>
                        <CardTitle>Card title</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
            </div>




        );
    }

}


export default GoogleApiWrapper({
    apiKey: "AIzaSyBFqVMbP9atq6bNZP_vrup7JdZYGepQ-98"
})(Provider)