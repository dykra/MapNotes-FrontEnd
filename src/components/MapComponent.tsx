import React from 'react';
import { compose } from 'recompose';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import InfoWindowMap from './MarkerInfoWindow';
import { WithScriptjsProps } from 'react-google-maps/lib/withScriptjs';
import { WithGoogleMapProps } from 'react-google-maps/lib/withGoogleMap';

const googleUrl = 'https://maps.googleapis.com/maps/api/js' +
    '?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places';

interface MapProps {
    googleMapURL: String;
    markers: any;
    onMapClick: (e: google.maps.MouseEvent | google.maps.IconMouseEvent) => void;
}

type MapComposeProps = WithScriptjsProps & WithGoogleMapProps & MapProps;

const Map = compose<MapProps, MapComposeProps>(
    withScriptjs,
    withGoogleMap,
)
((props: MapProps) => {
    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{lat: -34.397, lng: 150.644}}
            onClick={props.onMapClick}
        >
            {props.markers.map((marker: any, index: any) =>
                <InfoWindowMap
                    lat={marker.position.lat()}
                    lng={marker.position.lng()}
                    index={index}
                    key={marker.position}
                />
            )}
        </GoogleMap>
    );
});

export default class MapContainer extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.state = {
            markers: []
        };
    }

    handleMapClick(event: any) {

        this.setState((prevState: any) => ({
            markers: [...prevState.markers, {position: event.latLng, isWindowOpened: false}]
        }));
    }

    render() {
        return (
            <div style={{height: '100%'}}>
                <Map
                    googleMapURL={googleUrl}
                    loadingElement={<div style={{height: `100%`}}/>}
                    containerElement={<div style={{height: `400px`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                    onMapClick={this.handleMapClick}
                    markers={this.state.markers}
                />
            </div>
        );
    }
}