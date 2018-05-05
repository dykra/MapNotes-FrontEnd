import React from 'react';
import { compose, withProps } from "recompose";
import { withGoogleMap, withScriptjs, GoogleMap } from 'react-google-maps';
import InfoWindowMap from "./MarkerInfoWindow";


const Map = compose(
    withScriptjs,
    withGoogleMap,
)
(props => {
    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{lat: -34.397, lng: 150.644}}
            onClick={props.onMapClick}
        >
            {props.markers.map((marker, index) =>

                <InfoWindowMap
                    lat={marker.position.lat()}
                    lng={marker.position.lng()}
                    index={index}
                    key={marker.position}
                    isNewMarker = {marker.isNewMarker}
                    closePin = {props.onDelete}


                />
            )}
        </GoogleMap>
    )
});

export default class MapContainer extends React.Component {

    constructor () {
        super();
        this.state = {
            markers : [],
            isNewMarker: false

        };
    }

    undoAddedMarker = () => {
        let array = this.state.markers;
        array.pop();
        this.setState({markers: array});
        // this.handleMarker();
    };



    handleMapClick(event) {

        this.setState(prevState => ({
            markers: [...prevState.markers,  { position: event.latLng, isNewMarker : true }]
        }))
        this.setState({isNewMarker : true})
    };


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
                    onMapClick={this.handleMapClick.bind(this)}
                    markers = {this.state.markers}
                    onDelete = {this.undoAddedMarker.bind(this)}


                />
            </div>
        )
    }
}