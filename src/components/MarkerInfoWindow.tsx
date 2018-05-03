import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

export default class InfoWindowMap extends Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            isOpen: false,
            isDetailOpen: false
        };

    }

    handleToggleDetailOpen() {
        this.setState({isDetailOpen: true});
    }

    handleClicks(id: any) {
        console.log(id);
        this.handleToggleDetailOpen();
    }

    handleToggleOpen() {
        this.setState({isOpen: true});
    }

    handleMouseOver(id: any) {
        console.log(id);
        this.handleToggleOpen();
    }

    handleToggleClose() {
        this.setState({isOpen: false});
    }

    handleMouseOut(id: any) {
        console.log(id);
        this.handleToggleClose();
    }

    render() {
        return (
            <Marker
                key={this.props.index}
                position={{lat: this.props.lat, lng: this.props.lng}}
                label={this.props.index.toString()}
                onMouseOver={() => this.handleMouseOver(this.props.index)}
                onMouseOut={() => this.handleMouseOut}
                onClick={() => this.handleClicks(this.props.index)}
            >
                {
                    this.state.isOpen &&
                    <InfoWindow >
                        <div>
                            <p>Atrybuty domyślne</p>
                            <p>Obrazek</p>
                        </div>
                    </InfoWindow>
                }
                {
                    this.state.isDetailOpen &&
                    <InfoWindow onCloseClick={() => this.setState({isDetailOpen: false})}>
                        <div>
                            <p>Atrybuty domyślne</p>
                            <p>Reszta atrubutów</p>
                            <p>Obrazek</p>

                        </div>
                    </InfoWindow>
                }
            </Marker>
        );
    }
}
