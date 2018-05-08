import React from 'react';
import { compose } from "recompose";
import { withGoogleMap, withScriptjs, GoogleMap } from 'react-google-maps';
import InfoWindowMap from "./MarkerInfoWindow";
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox"

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

const Map = compose(
    withScriptjs,
    withGoogleMap,
)
(props => {
    return (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{lat: -34.397, lng: 150.644}}
            onBoundsChanged={props.onBoundsChanged}
            ref={props.handleMapMounted}
            onClick={props.onMapClick}
        >
            <SearchBox
                ref={props.handleSearchBoxMounted}
                bounds={props.bounds}
                controlPosition={google.maps.ControlPosition.TOP_LEFT}
                onPlacesChanged={props.onPlacesChanged}
                onBoundsChanged={props.handleBoundsChanged}
                >
                <input
                    type="text"
                    placeholder="Search places"
                    style={INPUT_STYLE}
                />
            </SearchBox>

            {props.markers.map((marker, index) =>
                <InfoWindowMap
                    lat={marker.position.lat()}
                    lng={marker.position.lng()}
                    index={index}
                    key={marker.position}
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
            bounds: null,
            center: null
        };
    }

    handleMapClick(event) {
        this.setState(prevState => ({
            markers: [...prevState.markers,  { position: event.latLng , isWindowOpened:false}]
        }));
    };


    handleBoundsChanged() {
        this.setState({
            bounds: this._map.getBounds(),
            center: this._map.getCenter(),
        });
    }

    handleSearchBoxMounted(searchBox) {
        this._searchBox = searchBox;
    }

    handleMapMounted(map){
        this._map = map;
    }

    handleOnPlacesChanged() {
        const places = this._searchBox.getPlaces();
        const bounds = new google.maps.LatLngBounds();
        places.forEach(place => {
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport)
            } else {
                bounds.extend(place.geometry.location)
            }
        });

        const searchBoxMarkers = places.map(place => ({
            position: place.geometry.location,
            isWindowOpened:false
        }));

        const nextCenter = searchBoxMarkers.length > 0 ? searchBoxMarkers[0].position : this.state.center;

        this.setState(prevState => ({
            center: nextCenter,
            markers: [...prevState.markers, {position: searchBoxMarkers[0].position, isWindowOpened: false}]
        }));
        this._map.fitBounds(bounds);
    }
    render (){
        return (
            <div style={{height: '100%'}}>
                <Map
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    onMapClick={this.handleMapClick.bind(this)}
                    markers = {this.state.markers}
                    onPlacesChanged={this.handleOnPlacesChanged.bind(this)}
                    handleSearchBoxMounted = {this.handleSearchBoxMounted.bind(this)}
                    handleMapMounted = {this.handleMapMounted.bind(this)}
                    onBoundsChanged={this.handleBoundsChanged.bind(this)}
                />
            </div>
        )
    }
}