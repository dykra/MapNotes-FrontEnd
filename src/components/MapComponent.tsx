import * as React from 'react';
import { compose } from 'recompose';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import MarkerInfoWindow from './MarkerInfoWindow';
import { WithScriptjsProps } from 'react-google-maps/lib/withScriptjs';
import { WithGoogleMapProps } from 'react-google-maps/lib/withGoogleMap';
import { GOOGLE_MAP_URL } from '../constants';
import { MarkerData } from '../types/MarkerData';
import LeftBarComponent from './LeftBarComponent';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import { ReactElement } from 'react';
const INPUT_STYLE = {
    boxSizing: `border-box`,
    border: `1px solid transparent`,
    width: `240px`,
    height: `32px`,
    marginTop: `27px`,
    padding: `0 12px`,
    borderRadius: `3px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    fontSize: `14px`,
    outline: `none`,
    textOverflow: `ellipses`,
};

interface MapProps {
    googleMapURL: String;
    markers: ReactElement<any>[];
    onMapClick: (e: google.maps.MouseEvent) => void;
    defaultCenter: google.maps.LatLngLiteral;
    defaultZoom: number;
    handleMapMounted: any;
    handleSearchBoxMounted: any;
    onBoundsChanged: any;
    onPlacesChanged: any;
    bounds: any;
    onDelete: any;
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
            onBoundsChanged={props.onBoundsChanged}
            ref={props.handleMapMounted}
        >
            <SearchBox
                bounds={props.bounds}
                controlPosition={google.maps.ControlPosition.TOP_LEFT}
                onPlacesChanged={props.onPlacesChanged}
                ref={props.handleSearchBoxMounted}
            >
                <input
                    type="text"
                    placeholder="Search places"
                    style={INPUT_STYLE}
                />
            </SearchBox>
            {props.markers}
        </GoogleMap>
    );
});

interface MapContainerState {
    markers: MarkerData[];
    visibleLeftBar: boolean;
    transportInput: String;
    bounds: any;
    center: any;
    isNewMarker: boolean;
}

export default class MapContainer extends React.Component<{}, MapContainerState> {

    references: { map: any; searchBox: any; } = {map: null, searchBox: null};

    constructor(props: {}) {
        super(props);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleMapMounted = this.handleMapMounted.bind(this);
        this.handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
        this.onBoundsChanged = this.onBoundsChanged.bind(this);
        this.onPlacesChanged = this.onPlacesChanged.bind(this);
        this.undoAddedMarker = this.undoAddedMarker.bind(this);

        this.state = {
            markers: [],
            visibleLeftBar: false,
            transportInput: '',
            bounds: null,
            center: null,
            isNewMarker: false
        };
    }

    handleMapClick(event: google.maps.MouseEvent) {
        this.setState((prevState: any) => ({
            markers: [...prevState.markers, {position: event.latLng, isWindowOpened: false, isNewMarker : true}]
        }));
        this.setState({isNewMarker : true});
    }

    handleSearchBoxMounted(searchBox: any) {
        this.references.searchBox = searchBox;
    }

    handleMapMounted(map: any) {
        this.references.map = map;
    }

    undoAddedMarker() {
        let array = this.state.markers;
        array.pop();
        this.setState({markers: array});
    }

    onBoundsChanged() {
        this.setState({
            bounds: this.references.map.getBounds(),
            center: this.references.map.getCenter(),
        });
    }

    onPlacesChanged() {
        const places = this.references.searchBox.getPlaces();
        const bounds = new google.maps.LatLngBounds();
        places.forEach((place: any) => {
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });

        const searchBoxMarkers = places.map((place: any) => ({
            position: place.geometry.location,
            isWindowOpened: false
        }));

        const nextCenter = searchBoxMarkers.length > 0 ? searchBoxMarkers[0].position : this.state.center;
        if (!this.state.markers.some(item => item.position.equals(searchBoxMarkers[0].position))) {

            this.setState(prevState => ({
                center: nextCenter,
                markers: [...prevState.markers, {position: searchBoxMarkers[0].position, isWindowOpened: false}]
            }));
        }

        this.references.map.fitBounds(bounds);
    }

    render() {
        const markers = this.state.markers.map((marker: MarkerData, index: any) => (
            <MarkerInfoWindow
                lat={marker.position.lat()}
                lng={marker.position.lng()}
                index={index}
                key={index}
                isNewMarker={this.state.isNewMarker}
                closePin={this.undoAddedMarker}
            />)
        );

        return (
            <div style={{height: '100%'}}>
                <LeftBarComponent/>
                <Map
                    googleMapURL={GOOGLE_MAP_URL}
                    loadingElement={<div style={{height: `100%`}}/>}
                    containerElement={<div style={{ height: '100vh' }} />}
                    mapElement={<div style={{height: `100%`}}/>}
                    onMapClick={this.handleMapClick}
                    markers={markers}
                    defaultCenter={{lat: -34.397, lng: 150.644}}
                    defaultZoom={8}
                    handleMapMounted={this.handleMapMounted}
                    handleSearchBoxMounted={this.handleSearchBoxMounted}
                    onBoundsChanged={this.onBoundsChanged}
                    bounds={this.state.bounds}
                    onPlacesChanged={this.onPlacesChanged}
                    onDelete={this.undoAddedMarker}
                />
            </div>
        );
    }
}