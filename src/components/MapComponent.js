import React from 'react';
import { compose, withStateHandlers, withProps } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';


const Map = compose(
    withScriptjs,
    withGoogleMap,
)
(props => {
    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{lat: -34.397, lng: 150.644}}
        >
        </GoogleMap>
    )
});

export default class MapContainer extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
        };

    }

    componentDidMount() {
    }


    render () {
        return (
            <div style={{height: '100%'}}>
                <Map
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        )
    }
}