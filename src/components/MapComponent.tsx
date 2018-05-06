import React, { ReactElement } from 'react';
import { compose } from 'recompose';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import MarkerInfoWindow from './MarkerInfoWindow';
import { WithScriptjsProps } from 'react-google-maps/lib/withScriptjs';
import { WithGoogleMapProps } from 'react-google-maps/lib/withGoogleMap';
import { GOOGLE_MAP_URL } from '../constants';
import { MarkerData } from '../types/MarkerData';

interface MapProps {
    googleMapURL: String;
    markers: ReactElement<any>[];
    onMapClick: (e: google.maps.MouseEvent) => void;
    defaultCenter: google.maps.LatLngLiteral;
    defaultZoom: number;
}

type MapComposeProps = WithScriptjsProps & WithGoogleMapProps & MapProps;

const Map = compose<MapProps, MapComposeProps>(
    withScriptjs,
    withGoogleMap,
)
((props: MapProps) => {
    return (
        <GoogleMap
            defaultZoom={props.defaultZoom}
            defaultCenter={props.defaultCenter}
            onClick={props.onMapClick}
        >
            {props.markers}
        </GoogleMap>
    );
});

interface MapContainerState {
    markers: MarkerData[];
}

export default class MapContainer extends React.Component<{}, MapContainerState> {

    constructor(props: {}) {
        super(props);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.state = {
            markers: []
        };
    }

    handleMapClick(event: google.maps.MouseEvent) {
        this.setState((prevState: any) => ({
            markers: [...prevState.markers, {position: event.latLng, isWindowOpened: false}]
        }));
    }

    render() {
        const markers = this.state.markers.map((marker: MarkerData, index: any) => (
            <MarkerInfoWindow
                lat={marker.position.lat()}
                lng={marker.position.lng()}
                index={index}
                key={index}
            />)
        );
        return (
            <div style={{height: '100%'}}>
                <Map
                    googleMapURL={GOOGLE_MAP_URL}
                    loadingElement={<div style={{height: `100%`}}/>}
                    containerElement={<div style={{ height: '100vh' }} />}
                    mapElement={<div style={{height: `100%`}}/>}
                    onMapClick={this.handleMapClick}
                    markers={markers}
                    defaultCenter={{lat: -34.397, lng: 150.644}}
                    defaultZoom={8}
                />
            </div>
        );
    }
}