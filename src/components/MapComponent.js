
import React from 'react';
import { withGoogleMap, GoogleMap, Marker, GoogleMapLoader } from 'react-google-maps';
import {observer} from 'mobx-react'
import {observable} from 'mobx'



const Map = withGoogleMap(props => {
    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{lat: -34.397, lng: 150.644}}
            onClick={props.onMapClick}
        >
            {props.markers.map(marker => (
                <Marker
                    {...marker}
                />
            ))}
            {props.isMarkerShown && <Marker position={props.markerPosition}/>}
        </GoogleMap>
    )
});
const MapContainer= observer( class Browse extends React.Component {
    constructor(props) {
        super(props);
        this.state= observable({
            markers:[{
                position:{
                    lat: -50.397,
                    lng:150.644,
                }
            },
                {
                    position:{
                        lat: -34.397,
                        lng:150.644,
                    }
                }]
        })
    }

    handleMarkerClick() {
        this.setState({
            zoom: 8,
        });
    }

    render() {
        return (
            <div style={{ height: '100%'}}>
                <Map
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    onMarkerClick = {this.handleMarkerClick}
                    containerElement={
                        <div style={{ height: `400px` }} />
                    }
                    mapElement={
                        <div style={{ height: `100%` }} />
                    }
                    markers={this.state.markers}/>
            </div>
        )
    }
});
export default MapContainer

