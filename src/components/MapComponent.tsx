import React, { ReactElement } from 'react';
import { compose } from 'recompose';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import MarkerInfoWindow from './MarkerInfoWindow';
import { WithScriptjsProps } from 'react-google-maps/lib/withScriptjs';
import { WithGoogleMapProps } from 'react-google-maps/lib/withGoogleMap';
import { GOOGLE_MAP_URL } from '../constants';
import { MarkerData } from '../types/MarkerData';
import { Button, ControlLabel, FormControl, Col, FormGroup } from 'react-bootstrap';

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
    visibleLeftBar: boolean;
    transportInput: String;
}

export default class MapContainer extends React.Component<{}, MapContainerState> {

    constructor(props: {}) {
        super(props);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.showLeftBar = this.showLeftBar.bind(this);
        this.hideLeftBar = this.hideLeftBar.bind(this);
        this.searchForTransport = this.searchForTransport.bind(this);
        this.onChangeDestinationInput = this.onChangeDestinationInput.bind(this);
        this.state = {
            markers: [],
            visibleLeftBar: false,
            transportInput: '',
        };
    }

    handleMapClick(event: google.maps.MouseEvent) {
        this.setState((prevState: any) => ({
            markers: [...prevState.markers, {position: event.latLng, isWindowOpened: false}]
        }));
    }

    showLeftBar(event: any) {
        this.setState(
            {
                visibleLeftBar: true,
            });
    }

    hideLeftBar(event: any) {
        this.setState({
            visibleLeftBar: false
        });
    }

    onChangeDestinationInput(event: any) {
        this.setState(({
            transportInput: event.target.value
        }));
    }

    searchForTransport(event: any) {
        console.log('search transport');
        console.log(event);
        console.log(this.state.transportInput);
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
        let leftBar;
        if (this.state.visibleLeftBar) {
            leftBar = (
                <div className={'OpenedLeftBar'}>
                    <div>
                        <Button
                            className={'CloseLeftBarButton'}
                            onClick={this.hideLeftBar}
                        >hide BAR
                        </Button>
                    </div>

                    <div className={'TransportBar'}>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={8}>Select Destiantion</Col>
                        <Col sm={8}>
                            <FormControl
                                placeholder="enter destination"
                                onChange={this.onChangeDestinationInput}
                            />
                        </Col>
                        <Button
                            className={'SearchTransportButton'}
                            bsSize="small"
                            active={true}
                            onClick={this.searchForTransport}
                        >SEARCH
                        </Button>
                    </FormGroup>
                    </div>

                    {/*<div className={'PinBar'}>PIN elements</div>*/}
                    {/*<div className={'TransportBar'}>*/}
                        {/*<div>Select destination</div>*/}
                            {/*<input*/}
                                {/*placeholder="destination"*/}
                                {/*onChange={this.onChangeDestinationInput}*/}
                            {/*/>*/}
                        {/*<button*/}
                            {/*className={'SearchTransportButton'}*/}
                            {/*onChange={this.searchForTransport}*/}
                        {/*> search*/}
                        {/*</button>*/}
                    {/*</div>*/}
                </div>
            );
        } else {
            leftBar = (
                <div className={'ClosedLeftBar'}>
                    <button
                        className={'OpenLeftBarButton'}
                        onClick={this.showLeftBar}
                    > open BAR
                    </button>
                </div>
            );
        }

        return (
            <div style={{height: '100%'}}>
                {leftBar}
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