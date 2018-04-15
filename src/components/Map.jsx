import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'


export default class Map1 extends Component {
    static defaultProps = {
        center: { lat: 40.7446790, lng: -73.9485420 },
        zoom: 11
    };

    render() {
        return (
            <div style={{width: '100%', height: 1000}} className='google-map'>
                <GoogleMapReact
                    ootstrapURLKeys={{
                        key: 'AIzaSyCFIcsdU4oXSvKQTTFR02oSbMBOhGE5jS8',
                        language: 'en'
                    }}
                    onClick={this._onClick}
                    defaultCenter={ this.props.center }
                    defaultZoom={ this.props.zoom }
                    onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
                >
                </GoogleMapReact>
            </div>
        )
    }

    _onClick(obj){ console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event);}


    renderMarkers(map, maps){
        let marker = new maps.Marker({
            position: { lat: 40.7446790, lng: -73.9485420 },
            map,
            title: 'Hello World!'
        });
    }

}
